import * as role from "@workspace/database/repositories/system/role";
import { Hono } from "hono";

import type { HonoEnv } from "../../../types";
import { requirePermission } from "../../../middleware/rbac";
import { getSearchParamsPage, getSearchParamsPageSize } from "../../../utils/server";
import { rfj, rsj } from "../../../utils/server/response-json";
import { getD1Db } from "../../../helpers/d1";

export const roleRouter = new Hono<HonoEnv>();

roleRouter.get("/role", requirePermission("system:role:read"), async (c) => {
  try {
    const db = getD1Db(c);
    const req = c.req.raw;
    const page = getSearchParamsPage(req);
    const pageSize = getSearchParamsPageSize(req);
    const total = await role.getCount(db);
    const list = await role.getList(db, { page, pageSize });
    return rsj({ total, list });
  } catch (error) {
    return rfj(error as Error);
  }
});

roleRouter.post("/role", requirePermission("system:role:create"), async (c) => {
  try {
    const db = getD1Db(c);
    const dto = await c.req.json();
    const result = await role.create(db, dto);
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

roleRouter.put("/role", requirePermission("system:role:update"), async (c) => {
  try {
    const db = getD1Db(c);
    const dto = await c.req.json();
    const result = await role.update(db, dto);
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

roleRouter.delete("/role", requirePermission("system:role:delete"), async (c) => {
  try {
    const db = getD1Db(c);
    const dto = await c.req.json();
    const result = await role.deleteByIds(db, dto.ids ?? []);
    return rsj(result ?? {});
  } catch (error) {
    return rfj(error as Error);
  }
});
