import { Hono } from "hono";

import type { HonoEnv } from "../../../types";
import { rfj } from "~/utils/server/response-json";

export const configRouter = new Hono<HonoEnv>();

configRouter.get("/config", async () => {
  return rfj({}, "Unsupport", { status: 501 });
});

configRouter.post("/config", async () => {
  return rfj({}, "Unsupport", { status: 501 });
});

configRouter.put("/config", async () => {
  return rfj({}, "Unsupport", { status: 501 });
});

configRouter.delete("/config", async () => {
  return rfj({}, "Unsupport", { status: 501 });
});
