import { Hono } from "hono";

import { createAuth } from "~/libs/auth/server";

/**
 * @see https://www.better-auth.com/docs/integrations/hono#mount-the-handler
 */
export const authRouter = new Hono().on(["POST", "GET"], "/auth/*", async (c) => {
  const env = c.env as {
    DB: D1Database;
    TURNSTILE_ENABLED?: string;
    TURNSTILE_SECRET_KEY?: string;
    NODE_ENV?: string;
  };
  const auth = createAuth(env);
  return await auth.handler(c.req.raw);
});
