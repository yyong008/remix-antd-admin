import type { LinksFunction } from "@remix-run/node";

import npStyle from "nprogress/nprogress.css?url";
import global from "@/styles/global.css?url";
import tailwind from "@/styles/tailwind.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: global },
  { rel: "stylesheet", href: tailwind },
  { rel: "stylesheet", href: npStyle },
];
