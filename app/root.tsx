import React from "react";
import { Links, Meta, Outlet, Scripts } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import stylesheet from "./style.css?url";
import { Button } from "@/components/ui/button";
import { CardDemo } from "@/components/custom/card-demo";

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

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
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
