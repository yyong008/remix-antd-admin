import "nprogress/nprogress.css";

import type { LinksFunction } from "@remix-run/node";
import global from "~/styles/global.css?url";
import tailwind from "~/styles/tailwind.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: global },
  { rel: "stylesheet", href: tailwind },
];
