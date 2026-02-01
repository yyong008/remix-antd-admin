import type { MiddlewareHandler } from "hono";

import { joseJwt } from "~/libs/jose";
import { rfj } from "~/utils/server/response-json";

export const authMiddleware: MiddlewareHandler = async (c, next) => {
  const token = c.req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return rfj({}, "No Authorization No Token", { status: 401 });
  }

  const { error, payload } = await joseJwt.decrypt(token);

  if (error || !payload) {
    return rfj((error as any) ?? {}, "Invalid Token", { status: 401 });
  }

  const { userId, exp } = payload as { userId?: number; exp?: number };

  if (!userId || !exp) {
    return rfj({}, "Invalid Token Payload", { status: 401 });
  }

  if (Date.now() >= exp * 1000) {
    return rfj({}, "Token has expired", { status: 401 });
  }

  c.set("userId", userId);
  await next();
};
