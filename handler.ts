import { createRequestHandler } from "@remix-run/architect";
import * as build from "./build/server/index.js";

const remixHandler = createRequestHandler({
  build,
});

export async function handler(...args: any) {
  /** FILL REQUEST PARAMETERS FOR HANDLER */
  const [event] = args;
  event.rawQueryString = event.queryStringParameters || "";
  event.requestContext.http = {
    method: event.httpMethod,
  };

  /** INVOKE HANDLER */
  const result = await (remixHandler as any)(...args);

  /** RESPONSE REMOVED COOKIES TO SET-COOKIE HEADER */
  return {
    ...result,
    cookies: undefined,
    multiValueHeaders: {
      "Set-Cookie": result.cookies || [],
    },
  };
}
