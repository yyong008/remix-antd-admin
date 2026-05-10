import { Hono } from "hono";

import type { HonoEnv } from "../../../types";
import { requirePermission } from "../../../middleware/rbac";
import { createConfigDAL } from "@workspace/database/dals/system/ConfigDAL";
import { getSearchParamsPage, getSearchParamsPageSize } from "../../../utils/server";
import { rfj, rsj } from "../../../utils/server/response-json";
import { getD1Db } from "../../../helpers/d1";

export const configRouter = new Hono<HonoEnv>();

configRouter.get("/config", requirePermission("system:config:read"), async (c) => {
  try {
    const db = getD1Db(c);
    const configDAL = createConfigDAL(db);
    const req = c.req.raw;
    const page = getSearchParamsPage(req);
    const pageSize = getSearchParamsPageSize(req);
    const total = await configDAL.getCount();
    const list = await configDAL.getList({ page, pageSize });
    return rsj({ total, list });
  } catch (error) {
    return rfj(error as Error);
  }
});

configRouter.post("/config", requirePermission("system:config:create"), async (c) => {
  try {
    const db = getD1Db(c);
    const configDAL = createConfigDAL(db);
    const dto = await c.req.json();
    const result = await configDAL.create(dto);
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

configRouter.put("/config", requirePermission("system:config:update"), async (c) => {
  try {
    const db = getD1Db(c);
    const configDAL = createConfigDAL(db);
    const dto = await c.req.json();
    const result = await configDAL.update(dto);
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

configRouter.delete("/config", requirePermission("system:config:delete"), async (c) => {
  try {
    const db = getD1Db(c);
    const configDAL = createConfigDAL(db);
    const dto = await c.req.json();
    const result = await configDAL.deleteByIds(dto.ids ?? []);
    return rsj(result ?? {});
  } catch (error) {
    return rfj(error as Error);
  }
});
