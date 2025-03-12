import { Context } from "hono";

export function devLogger() {
  return async (c: Context, next: Function) => {
    if (process.env.NODE_ENV === "development") {
      console.log("[request api url]: ", c.req.method, c.req.url);
      if (
        c.req.method === "POST" ||
        c.req.method === "PUT" ||
        c.req.method === "DELETE"
      ) {   
        const body = await c.req.raw.clone().json(); // const body = await c.req.json(); The response body is a ReadableStream that can only be consumed once
        console.log("[request api json body]: ", JSON.stringify(body, null, 2));
      }
    }
    await next();
  };
}
