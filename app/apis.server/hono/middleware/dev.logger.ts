import { Context } from "hono";

export function devLogger() {
  return async (c: Context, next: Function) => {
    if (process.env.NODE_ENV === "development") {
      console.log("[request api url]: ", c.req.url);
    }
    await next();
  };
}
