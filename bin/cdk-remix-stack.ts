import { Construct } from "constructs";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { HttpMethod, HttpApi } from "aws-cdk-lib/aws-apigatewayv2";
import {
  HttpLambdaIntegration,
  HttpUrlIntegration,
} from "aws-cdk-lib/aws-apigatewayv2-integrations";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Duration, RemovalPolicy } from "aws-cdk-lib";
import packageJSON from "../package.json";
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
import { CfnOutput, Stack } from "aws-cdk-lib";

export class CdkRemixStack extends Stack {
  private readonly key: string;

  constructor(scope: Construct, id: string, props?: any) {
    super(scope, id, props);
    this.key = props.keyPrefix || "_static";

    const helloFunction = new NodejsFunction(this, "HelloFunction", {
      runtime: Runtime.NODEJS_20_X,
      entry: __dirname + "/../handler.mts",
      bundling: {
        bundleAwsSDK: false,
        nodeModules: Object.keys(packageJSON.dependencies),
      },
      timeout: Duration.seconds(20),
    });
    const bucket = new Bucket(this, "HelloBucket", {
      objectOwnership: ObjectOwnership.BUCKET_OWNER_ENFORCED,
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "404.html",
      autoDeleteObjects: true,
      removalPolicy: RemovalPolicy.DESTROY,
      blockPublicAccess: BlockPublicAccess.BLOCK_ACLS,
      accessControl: BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
      publicReadAccess: true,
    });
    new BucketDeployment(this, "Default", {
      sources: [Source.asset(__dirname + "/../public")],
      destinationBucket: bucket,
      destinationKeyPrefix: "_static",
      cacheControl: [
        CacheControl.maxAge(Duration.days(365)),
        CacheControl.sMaxAge(Duration.days(365)),
      ],
    });
    new BucketDeployment(this, "Default2", {
      sources: [Source.asset(__dirname + "/../build/client/assets")],
      destinationBucket: bucket,
      destinationKeyPrefix: "assets",
      cacheControl: [
        CacheControl.maxAge(Duration.days(365)),
        CacheControl.sMaxAge(Duration.days(365)),
      ],
    });

    bucket.grantRead(helloFunction);
    bucket.grantReadWrite(helloFunction);
    bucket.grantDelete(helloFunction);
    bucket.grantPut(helloFunction);

    const integration = new HttpLambdaIntegration(
      "LambdaIntegration",
      helloFunction
    );
    const s3Integration = new HttpUrlIntegration(
      "S3Integration",
      `https://${bucket.bucketName}.s3.amazonaws.com/_static/{proxy}`,
      { method: HttpMethod.GET }
    );
    const s3Integration2 = new HttpUrlIntegration(
      "S3Integration2",
      `https://${bucket.bucketName}.s3.amazonaws.com/assets/{proxy}`,
      { method: HttpMethod.GET }
    );

    const httpApi = new HttpApi(this, "TranceStackApi", {
      apiName: "helloHandler",
    });
    httpApi.addRoutes({
      path: "/{proxy+}",
      methods: [HttpMethod.ANY],
      integration: integration,
    });
    httpApi.addRoutes({
      path: "/_static/{proxy+}",
      methods: [HttpMethod.GET],
      integration: s3Integration,
    });
    httpApi.addRoutes({
      path: "/assets/{proxy+}",
      methods: [HttpMethod.GET],
      integration: s3Integration2,
    });

    new CfnOutput(this, "ApiUrl", {
      description: "The URL of the API",
      value: `https://${httpApi.httpApiId}.execute-api.${
        Stack.of(this).region
      }.${Stack.of(this).urlSuffix}`,
    });
  }
}
