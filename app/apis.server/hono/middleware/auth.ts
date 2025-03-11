import { Context } from "hono";

export function auth() {
  return async (c: Context, next: Function) => {
    const token = c.req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return c.json({
        message: "Unauthorized",
        code: 1,
        data: {},
      }, 401);
    }
    await next();
  };
}