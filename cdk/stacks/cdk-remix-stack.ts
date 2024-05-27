import { Construct } from "constructs";
import { Stack } from "aws-cdk-lib";
import { LambdaConstruct } from "../constructs/lambda-construct.ts";
import { StaticConstruct } from "../constructs/static-construct.ts";
import { APIConstruct } from "../constructs/api-construct.ts";

export class CdkRemixStack extends Stack {
  constructor(scope: Construct, id: string, props?: any) {
    super(scope, id, props);

    const lambdaConstruct = new LambdaConstruct(this, "LambdaConstruct");
    const staticConstruct = new StaticConstruct(this, "StaticConstruct", {
      lambdaConstruct: lambdaConstruct,
    });
    const apiConstruct = new APIConstruct(this, "ApiConstruct", {
      lambdaConstruct: lambdaConstruct,
      staticConstruct: staticConstruct,
    });
  }
}
