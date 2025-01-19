import { Context } from "../context";
import { ERRIR_PRESENTATION_MODE } from "~/constants/error";

export async function presentatioModeMiddleware(c: Context, next: Function) {
  const args = c.reactRouterArgs;
  const method: string = args.request.method.toUpperCase();
  if (method !== "GET" && process.env.PRESENTATION_MODE === "1") {
    return c.json({
      code: 0,
      message: ERRIR_PRESENTATION_MODE,
      data: {},
    });
  }
  await next();
}
