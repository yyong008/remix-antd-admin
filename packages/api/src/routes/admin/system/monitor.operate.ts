import * as operate from "@workspace/database/repositories/operate/operate";
import { Hono } from "hono";

import type { HonoEnv } from "../../../types";
import { requirePermission } from "../../../middleware/rbac";
import { getSearchParamsPage, getSearchParamsPageSize } from "../../../utils/server";
import { rfj, rsj } from "../../../utils/server/response-json";
import { getD1Db } from "../../../helpers/d1";

export const monitorOperateRouter = new Hono<HonoEnv>();

monitorOperateRouter.get(
  "/monitor/operate",
  requirePermission("system:monitor:operate:read"),
  async (c) => {
    try {
      const db = getD1Db(c);
      const req = c.req.raw;
      const page = getSearchParamsPage(req);
      const pageSize = getSearchParamsPageSize(req);
      const total = await operate.getOperatesCount(db, { where: {} });
      const list = await operate.getOperates(db, {
        where: {},
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { id: "desc" } as any,
      });
      return rsj({ total, list });
    } catch (error) {
      return rfj(error as Error);
    }
  },
);

monitorOperateRouter.post(
  "/monitor/operate",
  requirePermission("system:monitor:operate:create"),
  async (c) => {
    try {
      const db = getD1Db(c);
      const dto = await c.req.json();
      const result = await operate.createOperate(db, dto);
      return rsj(result);
    } catch (error) {
      return rfj(error as Error);
    }
  },
);

monitorOperateRouter.put(
  "/monitor/operate",
  requirePermission("system:monitor:operate:update"),
  async () => {
    return rfj({}, "Unsupport", { status: 501 });
  },
);

monitorOperateRouter.delete(
  "/monitor/operate",
  requirePermission("system:monitor:operate:delete"),
  async (c) => {
    try {
      const db = getD1Db(c);
      const dto = await c.req.json();
      const result = await operate.deleteByIdsOperate(db, dto.ids ?? []);
      return rsj(result ?? {});
    } catch (error) {
      return rfj(error as Error);
    }
  },
);
