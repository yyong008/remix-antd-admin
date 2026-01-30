import type { LinksFunction } from "react-router";
import type { MiddlewareFunction } from "react-router";
import { RootRoute } from "~/app/modules/root/route";
import global from "@/styles/global.css?url";
import npStyle from "nprogress/nprogress.css?url";
import tailwind from "@/styles/tailwind.css?url";
export { loader } from "~/app/modules/root/loader";
export { ErrorBoundary } from "~/app/modules/root/error-boundary";

import { paraglideMiddleware } from "~/paraglide/server.js";

export const middleware: MiddlewareFunction[] = [
	(ctx, next) => paraglideMiddleware(ctx.request, () => next()),
];

export let handle = { i18n: ["common", "menu"] };

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: global },
  { rel: "stylesheet", href: tailwind },
  { rel: "stylesheet", href: npStyle },
];

export default function Root() {
  return <RootRoute />;
}
