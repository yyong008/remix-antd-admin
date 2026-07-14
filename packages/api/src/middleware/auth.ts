import { createMiddleware } from "hono/factory";
import { createAuth } from "@workspace/auth/server";
import { rfj } from "../utils/server/response-json";
import type { HonoEnv } from "../types";
import { drizzle } from "drizzle-orm/d1";

// Better Auth infers user fields as a union (`string | boolean | Date`); at runtime
// id is the string primary key and name/email are plain strings or null.
const toStr = (v: unknown): string | null => (typeof v === "string" && v.length > 0 ? v : null);

export const authMiddleware = createMiddleware<HonoEnv>(async (c, next) => {
  const env = c.env;
  const db = drizzle(env.DB);
  const auth = createAuth(db, env);

  const result = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!result?.user.id) {
    return c.json(rfj("Unauthorized"), 401);
  }

  if (result.user?.banned) {
    return c.json(rfj(result.user.banReason || "User banned"), 403);
  }

  c.set("userId", String(result.user.id));
  c.set("username", toStr(result.user.name) || toStr(result.user.email) || null);

  await next();
});
