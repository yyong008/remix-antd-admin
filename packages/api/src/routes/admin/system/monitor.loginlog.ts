import * as loginLog from "@workspace/database/repositories/system/login-log";
import { Hono } from "hono";

import type { HonoEnv } from "../../../types";
import { requirePermission } from "../../../middleware/rbac";
import {
  getSearchParams,
  getSearchParamsPage,
  getSearchParamsPageSize,
} from "../../../utils/server";
import { rfj, rsj } from "../../../utils/server/response-json";
import { getD1Db } from "../../../helpers/d1";

export const monitorLoginLogRouter = new Hono<HonoEnv>();

monitorLoginLogRouter.get(
  "/monitor/loginlog",
  requirePermission("system:monitor:loginlog:read"),
  async (c) => {
    try {
      const db = getD1Db(c);
      const req = c.req.raw;
      const page = getSearchParamsPage(req);
      const pageSize = getSearchParamsPageSize(req);
      const name = getSearchParams(req, "name") ?? "";
      const total = await loginLog.getCount(db);
      const list = await loginLog.getLoginLogList(db, { page, pageSize, name });
      return rsj({ total, list });
    } catch (error) {
      return rfj(error as Error);
    }
  },
);

monitorLoginLogRouter.post(
  "/monitor/loginlog",
  requirePermission("system:monitor:loginlog:create"),
  async (c) => {
    try {
      const db = getD1Db(c);
      const dto = await c.req.json();
      const result = await loginLog.create(db, dto);
      return rsj(result);
    } catch (error) {
      return rfj(error as Error);
    }
  },
);

monitorLoginLogRouter.put(
  "/monitor/loginlog",
  requirePermission("system:monitor:loginlog:update"),
  async () => {
    return rfj({}, "Unsupport", { status: 501 });
  },
);

monitorLoginLogRouter.delete(
  "/monitor/loginlog",
  requirePermission("system:monitor:loginlog:delete"),
  async (c) => {
    try {
      const db = getD1Db(c);
      const dto = await c.req.json();
      const result = await loginLog.deleteByIds(db, dto.ids ?? []);
      return rsj(result ?? {});
    } catch (error) {
      return rfj(error as Error);
    }
  },
);
