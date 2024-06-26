import "source-map-support/register";
import { App } from "aws-cdk-lib";
import { CdkRemixStack } from "./stacks/cdk-remix-stack.ts";

function createStack() {
  const app = new App();
  new CdkRemixStack(app, "CdkRemixStack", {});
}

createStack();
