import React from "react";
import { Links, Meta, Scripts } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import stylesheet from "./style.css?url";
import { Dashboard } from "./routes/login/route";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "icon", href: "/favicon.ico" },
];

export default function App() {
  return (
    <html className="">
      <head>
        <title>Remix Starter</title>
        <Meta />
        <Links />
      </head>
      <body>
        <Dashboard />
        <Scripts />
      </body>
    </html>
  );
}
