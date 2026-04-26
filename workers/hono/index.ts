import { Hono } from "hono";
import { app as apiApp } from "../../app/api";
import { createRequestHandler, RouterContextProvider } from "react-router";
import { runtimeEnvContext, runtimeExecutionContext } from "~/runtime-context";

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

export const app = new Hono<{ Bindings: Env }>().route("/", apiApp).use("*", async (c) => {
  const context = new RouterContextProvider();
  context.set(runtimeEnvContext, c.env);
  context.set(runtimeExecutionContext, c.executionCtx);
  return await requestHandler(c.req.raw, context);
});
export default app;
