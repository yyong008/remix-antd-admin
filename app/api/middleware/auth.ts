import { auth } from "~/libs/auth/server";
import { createMiddleware } from "hono/factory";
import { fail } from "~/utils/response";

export const authMiddleware = createMiddleware(async (c, next) => {
  const result = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!result?.user.id) {
    return c.json(fail("Unauthorized", 401), 401);
  }

  if (result.user?.banned) {
    return c.json(fail(result.user.banReason || "User banned", 403), 403);
  }

  await next();
});
