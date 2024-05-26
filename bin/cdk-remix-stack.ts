import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apiGateway from "aws-cdk-lib/aws-apigateway";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Duration } from "aws-cdk-lib";
import packageJSON from "../package.json";

export class CdkRemixStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // const helloFunction = new lambda.Function(this, "HelloFunction", {
    //   runtime: lambda.Runtime.NODEJS_20_X,
    //   code: lambda.Code.fromAsset("dist"),
    //   handler: "hello.handler",
    // });

    const helloFunction = new NodejsFunction(this, "HelloFunction", {
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: __dirname + "/../src/hello.mts",
      bundling: {
        nodeModules: Object.keys(packageJSON.dependencies),
      },
      timeout: Duration.seconds(20),
    });

    const api = new apiGateway.LambdaRestApi(this, "HelloApi", {
      handler: helloFunction,
      proxy: false,
    });
    api.root.addMethod("GET");
    // Define the '/{any+}' resource with a GET method
    const anyResource = api.root.addResource("{routes+}");
    anyResource.addMethod("GET");
  }
}
