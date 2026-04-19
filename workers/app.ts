import { app } from "../app/api/index";
import { createRequestHandler, RouterContextProvider } from "react-router";
import type { AppType } from "../app/api/index";
import type { Env } from "../worker-configuration.d.ts";

declare module "react-router" {
  export interface AppLoadContext extends Record<string, any> {
    cloudflare?: {
      env: Env;
      ctx: ExecutionContext;
    };
  }
}

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE,
);

export default {
  async fetch(request, env, ctx) {
    const { pathname } = new URL(request.url);
    if (pathname.startsWith("/api")) {
      const result = await app.fetch(request, env, ctx);
      return result;
    }
    const loadContext = new RouterContextProvider();
    Object.assign(loadContext, { cloudflare: { env, ctx } });
    return await requestHandler(request, loadContext);
  },
} satisfies ExportedHandler<Env>;
