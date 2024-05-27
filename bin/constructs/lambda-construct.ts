import { Duration } from "aws-cdk-lib";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import packageJSON from "../../package.json";
import { Runtime } from "aws-cdk-lib/aws-lambda";

export class LambdaConstruct extends Construct {
  private lambdaFunction: NodejsFunction;

  constructor(scope: Construct, id: string, props?: any) {
    super(scope, id);

    this.lambdaFunction = new NodejsFunction(this, "LambdaFunction", {
      entry: __dirname + "/../../handler.ts",
      runtime: Runtime.NODEJS_20_X,
      timeout: Duration.seconds(20),
      bundling: {
        minify: true,
        keepNames: true,
        bundleAwsSDK: false,
        nodeModules: Object.keys(packageJSON.dependencies),
      },
    });
  }

  public get lambda() {
    return this.lambdaFunction;
  }
}
