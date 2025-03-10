import type { Hono } from "hono";

export const handle =
  (app: Hono<any, any, any>) =>
  async (args: { request: Request }): Promise<Response> => {
    const { request } = args;
    return await app.fetch(request);
  };
