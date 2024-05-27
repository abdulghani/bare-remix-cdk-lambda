import { createRequestHandler } from "@remix-run/architect";
import * as build from "./build/server/index.js";

const remixHandler = createRequestHandler({
  build,
});

export async function handler(...args: any) {
  const [event] = args;

  /** REDIRECT ASSET/PUBLIC FILES */
  if (
    event.requestContext?.http?.method === "GET" &&
    (event.pathParameters?.proxy?.startsWith("assets/") ||
      (!event.pathParameters?.proxy?.includes("/") &&
        event.pathParameters?.proxy?.includes(".")))
  ) {
    return {
      statusCode: 307,
      headers: {
        Location: `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${event.pathParameters.proxy}`,
      },
    };
  }

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
