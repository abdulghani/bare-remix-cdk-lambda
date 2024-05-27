import { Links, Meta, Outlet, Scripts } from "@remix-run/react";

export default function App() {
  return (
    <html>
      <head>
        <link rel="icon" href="/public/favicon.ico" />
        <Meta />
        <Links />
      </head>
      <body>
        <h1>Hello world there!</h1>
        <Outlet />

        <Scripts />
      </body>
    </html>
  );
}
