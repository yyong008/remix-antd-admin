import { Hono } from "hono";

import type { HonoEnv } from "../../../types";
import { requirePermission } from "../../../middleware/rbac";
import { createDeptDAL } from "@workspace/database/dals/system/DeptDAL";
import { getSearchParamsPage, getSearchParamsPageSize } from "../../../utils/server";
import { rfj, rsj } from "../../../utils/server/response-json";
import { getD1Db } from "../../../helpers/d1";

export const deptRouter = new Hono<HonoEnv>();

deptRouter.get("/dept", requirePermission("system:dept:read"), async (c) => {
  try {
    const db = getD1Db(c);
    const deptDAL = createDeptDAL(db);
    const req = c.req.raw;
    const page = getSearchParamsPage(req);
    const pageSize = getSearchParamsPageSize(req);
    const total = await deptDAL.getCount();
    const list = await deptDAL.getList({ page, pageSize });
    return rsj({ total, list });
  } catch (error) {
    return rfj(error as Error);
  }
});

deptRouter.post("/dept", requirePermission("system:dept:create"), async (c) => {
  try {
    const db = getD1Db(c);
    const deptDAL = createDeptDAL(db);
    const dto = await c.req.json();
    const result = await deptDAL.create(dto);
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

deptRouter.put("/dept", requirePermission("system:dept:update"), async (c) => {
  try {
    const db = getD1Db(c);
    const deptDAL = createDeptDAL(db);
    const dto = await c.req.json();
    const result = await deptDAL.update(dto);
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

deptRouter.delete("/dept", requirePermission("system:dept:delete"), async (c) => {
  try {
    const db = getD1Db(c);
    const deptDAL = createDeptDAL(db);
    const dto = await c.req.json();
    const result = await deptDAL.deleteByIds(dto.ids ?? []);
    return rsj(result ?? {});
  } catch (error) {
    return rfj(error as Error);
  }
});
