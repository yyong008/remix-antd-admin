import * as operate from "@workspace/database/repositories/operate/operate";
import { createMiddleware } from "hono/factory";

import type { HonoEnv } from "../types";
import { getD1Db } from "../helpers/d1";

function getClientIp(headers: Headers) {
  const cfIp = headers.get("cf-connecting-ip");
  if (cfIp) return cfIp;
  const xff = headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]?.trim() || xff;
  return headers.get("x-real-ip");
}

export const operateMiddleware = createMiddleware<HonoEnv>(async (c, next) => {
  await next();

  if (c.req.method === "OPTIONS") return;

  const userId = c.get("userId");
  if (!userId) return;

  const persist = async () => {
    try {
      const db = getD1Db(c);
      const req = c.req;
      await operate.createOperate(db, {
        userId,
        username: c.get("username") ?? null,
        path: req.path,
        url: req.url,
        method: req.method,
        ipAddress: getClientIp(req.raw.headers) ?? null,
        statusCode: c.res.status,
      });
    } catch (error) {
      console.error("operateMiddleware failed:", error);
    }
  };

  try {
    c.executionCtx.waitUntil(persist());
  } catch {
    void persist();
  }
});
