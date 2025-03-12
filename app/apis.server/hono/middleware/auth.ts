import { Context } from "hono";
import { joseJwt } from "~/libs/jose";

export function auth() {
  return async (c: Context, next: Function) => {
    const token = c.req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return c.json(
        {
          message: "Unauthorized",
          code: 1,
          data: {},
        },
        401,
      );
    }

    try {
      const payload = await joseJwt.getTokenUserIdByArgs({
        request: c.req.raw,
      });
      if (!payload) {
        return c.json(
          {
            message: "Unauthorized",
            code: 1,
            data: {},
          },
          401,
        );
      }
    } catch (error) {
      return c.json(
        {
          message: (error as Error).message ?? error,
          code: 1,
          data: {},
        },
        401,
      );
    }
    await next();
  };
}
