import { Context } from "hono";

export function presentationMode() {
  return async (c: Context, next: Function) => {
    if (
      c.req.method === "POST" ||
      c.req.method === "PUT" ||
      c.req.method === "DELETE" ||
      c.req.method === "PATCH"
    ) {
      const presentationMode = import.meta.env.VITE_PRESENTATION_MODE;
      if (presentationMode === 0) {
        return c.json({
          message: "Presentation mode is disabled",
          code: 1,
          data: {},
        }, 403);
      }
    }
    await next();
  };
}
