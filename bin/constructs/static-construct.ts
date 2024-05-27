import { Duration, RemovalPolicy, Stack } from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  BlockPublicAccess,
  Bucket,
  BucketAccessControl,
  ObjectOwnership,
} from "aws-cdk-lib/aws-s3";
import {
  BucketDeployment,
  CacheControl,
  Source,
} from "aws-cdk-lib/aws-s3-deployment";
import { LambdaConstruct } from "./lambda-construct";

export class StaticConstruct extends Construct {
  private s3Bucket: Bucket;

  constructor(
    scope: Construct,
    id: string,
    props: {
      lambdaConstruct: LambdaConstruct;
    }
  ) {
    super(scope, id);

    this.s3Bucket = new Bucket(this, "StaticBucket", {
      objectOwnership: ObjectOwnership.BUCKET_OWNER_ENFORCED,
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "404.html",
      autoDeleteObjects: true,
      removalPolicy: RemovalPolicy.DESTROY,
      blockPublicAccess: BlockPublicAccess.BLOCK_ACLS,
      accessControl: BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
      publicReadAccess: true,
    });

    new BucketDeployment(this, "public-files", {
      sources: [Source.asset(__dirname + "/../../public")],
      destinationBucket: this.s3Bucket,
      destinationKeyPrefix: "public",
      cacheControl: [
        CacheControl.maxAge(Duration.days(365)),
        CacheControl.sMaxAge(Duration.days(365)),
      ],
    });
    new BucketDeployment(this, "asset-files", {
      sources: [Source.asset(__dirname + "/../../build/client/assets")],
      destinationBucket: this.s3Bucket,
      destinationKeyPrefix: "assets",
      cacheControl: [
        CacheControl.maxAge(Duration.days(365)),
        CacheControl.sMaxAge(Duration.days(365)),
      ],
    });

    this.s3Bucket.grantRead(props.lambdaConstruct.lambda);
    this.s3Bucket.grantReadWrite(props.lambdaConstruct.lambda);
    this.s3Bucket.grantDelete(props.lambdaConstruct.lambda);
    this.s3Bucket.grantPut(props.lambdaConstruct.lambda);
  }

  public get bucket() {
    return this.s3Bucket;
  }
}
