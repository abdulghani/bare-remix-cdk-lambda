import React from "react";
import { Links, Meta, Outlet, Scripts } from "@remix-run/react";

export default function App() {
  return (
    <html>
      <head>
        <title>Remix Starter</title>
        <link rel="icon" href="/favicon.ico" />
        <Meta />
        <Links />
      </head>
      <body>
        <h1>Hello world there!</h1>
        <img src="/diagram.drawio.svg" />
        <Outlet />

        <Scripts />
      </body>
    </html>
  );
}
