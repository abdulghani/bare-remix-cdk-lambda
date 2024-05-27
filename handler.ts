import { createRequestHandler } from "@remix-run/architect";
import * as build from "./build/server/index.js";

const remixHandler = createRequestHandler({
  build,
});

export async function handler(...args: any) {
  const [event] = args;
  event.rawQueryString = event.queryStringParameters || "";
  event.requestContext.http = {
    method: event.httpMethod,
  };

  const result = await (remixHandler as any)(...args);
  return {
    statusCode: result.statusCode,
    headers: result.headers,
    multiValueHeaders: {
      "Set-Cookie": result.cookies || [],
    },
    body: result.body,
    isBase64Encoded: result.isBase64Encoded,
  };
}
