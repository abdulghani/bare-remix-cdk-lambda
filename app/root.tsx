import React from "react";
import { Links, Meta, Outlet, Scripts } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import stylesheet from "./style.css?url";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "icon", href: "/favicon.ico" },
];

export default function App() {
  return (
    <html>
      <head>
        <title>Remix Starter</title>
        <Meta />
        <Links />
      </head>
      <body>
        <h1 className="text-3xl font-bold">Hello world there!</h1>
        <img src="/diagram.drawio.svg" />
        <Button>Click me</Button>
        <Outlet />

        <AlertDialog>
          <AlertDialogTrigger>Open</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Scripts />
      </body>
    </html>
  );
}
