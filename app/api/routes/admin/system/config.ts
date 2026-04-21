import { Hono } from "hono";

import type { HonoEnv } from "../../../types";
import { requirePermission } from "~/api/middleware/rbac";
import { rfj } from "~/utils/server/response-json";

export const configRouter = new Hono<HonoEnv>();

configRouter.get("/config", requirePermission("system:config:read"), async () => {
  return rfj({}, "Unsupport", { status: 501 });
});

configRouter.post("/config", requirePermission("system:config:create"), async () => {
  return rfj({}, "Unsupport", { status: 501 });
});

configRouter.put("/config", requirePermission("system:config:update"), async () => {
  return rfj({}, "Unsupport", { status: 501 });
});

configRouter.delete("/config", requirePermission("system:config:delete"), async () => {
  return rfj({}, "Unsupport", { status: 501 });
});
