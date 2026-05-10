import { Hono } from "hono";

import type { HonoEnv } from "../../../types";
import { requirePermission } from "../../../middleware/rbac";
import { rfj } from "../../../utils/server/response-json";

export const monitorServeRouter = new Hono<HonoEnv>();

monitorServeRouter.get(
  "/monitor/serve",
  requirePermission("system:monitor:serve:read"),
  async () => {
    return rfj({}, "Unsupport", { status: 501 });
  },
);

monitorServeRouter.post(
  "/monitor/serve",
  requirePermission("system:monitor:serve:create"),
  async () => {
    return rfj({}, "Unsupport", { status: 501 });
  },
);

monitorServeRouter.put(
  "/monitor/serve",
  requirePermission("system:monitor:serve:update"),
  async () => {
    return rfj({}, "Unsupport", { status: 501 });
  },
);

monitorServeRouter.delete(
  "/monitor/serve",
  requirePermission("system:monitor:serve:delete"),
  async () => {
    return rfj({}, "Unsupport", { status: 501 });
  },
);
