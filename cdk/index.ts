import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { CdkRemixStack } from "./stacks/cdk-remix-stack";

const app = new cdk.App();

new CdkRemixStack(app, "CdkRemixStack", {});