import { Hono } from "hono";
import { app as apiApp } from "../../app/api";
import { createRequestHandler } from "react-router";

declare module "react-router" {
  export interface AppLoadContext extends Record<string, any> {
    cloudflare?: {
      env: Env;
      ctx: ExecutionContext;
    };
  }
}

export const app = new Hono<{ Bindings: { Env: Env } }>()
  .use("*", async (c) => {
    return c.json({
      message: "Hello, World!",
    });
  })
  .route("/", apiApp)
  .use("*", async (c) => {
    const requestHandler = createRequestHandler(
      () => import("virtual:react-router/server-build"),
      import.meta.env.MODE,
    );
    return await requestHandler(c.req.raw);
  });
export default app;
