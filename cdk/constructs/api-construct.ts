import { CfnOutput, Stack } from "aws-cdk-lib";
import { Construct } from "constructs";
import { StaticConstruct } from "./static-construct";
import { LambdaConstruct } from "./lambda-construct";
import { HttpApi, HttpMethod } from "aws-cdk-lib/aws-apigatewayv2";
import {
  HttpLambdaIntegration,
  HttpUrlIntegration,
} from "aws-cdk-lib/aws-apigatewayv2-integrations";

export class APIConstruct extends Construct {
  constructor(
    scope: Construct,
    id: string,
    props: {
      lambdaConstruct: LambdaConstruct;
      staticConstruct: StaticConstruct;
    }
  ) {
    super(scope, id);

    const httpAPI = new HttpApi(this, "api-gateway", {
      apiName: "remix-api",
    });

    const lambdaIntegration = new HttpLambdaIntegration(
      "LambdaIntegration",
      props.lambdaConstruct.lambda
    );
    httpAPI.addRoutes({
      path: "/{proxy+}",
      methods: [HttpMethod.ANY],
      integration: lambdaIntegration,
    });
    const s3IntegrationPublic = new HttpUrlIntegration(
      "S3IntegrationPublic",
      `https://${props.staticConstruct.bucket.bucketName}.s3.amazonaws.com/public/{proxy}`,
      { method: HttpMethod.GET }
    );
    httpAPI.addRoutes({
      path: "/public/{proxy+}",
      methods: [HttpMethod.GET],
      integration: s3IntegrationPublic,
    });
    const s3IntegrationAsset = new HttpUrlIntegration(
      "S3IntegrationAsset",
      `https://${props.staticConstruct.bucket.bucketName}.s3.amazonaws.com/assets/{proxy}`,
      { method: HttpMethod.GET }
    );
    httpAPI.addRoutes({
      path: "/assets/{proxy+}",
      methods: [HttpMethod.GET],
      integration: s3IntegrationAsset,
    });

    new CfnOutput(this, "ApiUrl", {
      description: "The URL of the API",
      value: `https://${httpAPI.httpApiId}.execute-api.${
        Stack.of(this).region
      }.${Stack.of(this).urlSuffix}`,
    });
  }
}
