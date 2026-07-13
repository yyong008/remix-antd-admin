import * as dict from "@workspace/database/repositories/system/dict";
import { Hono } from "hono";

import type { HonoEnv } from "../../../types";
import { requirePermission } from "../../../middleware/rbac";
import { getSearchParamsPage, getSearchParamsPageSize } from "../../../utils/server";
import { rfj, rsj } from "../../../utils/server/response-json";
import { getD1Db } from "../../../helpers/d1";

export const dictRouter = new Hono<HonoEnv>();

dictRouter.get("/dict", requirePermission("system:dict:read"), async (c) => {
  try {
    const db = getD1Db(c);
    const req = c.req.raw;
    const page = getSearchParamsPage(req);
    const pageSize = getSearchParamsPageSize(req);
    const total = await dict.getCount(db);
    const list = await dict.getList(db, { page, pageSize });
    return rsj({ total, list });
  } catch (error) {
    return rfj(error as Error);
  }
});

dictRouter.post("/dict", requirePermission("system:dict:create"), async (c) => {
  try {
    const db = getD1Db(c);
    const dto = await c.req.json();
    const result = await dict.create(db, dto);
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

dictRouter.put("/dict", requirePermission("system:dict:update"), async (c) => {
  try {
    const db = getD1Db(c);
    const dto = await c.req.json();
    const result = await dict.update(db, dto);
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

dictRouter.delete("/dict", requirePermission("system:dict:delete"), async (c) => {
  try {
    const db = getD1Db(c);
    const dto = await c.req.json();
    const result = await dict.deleteByIds(db, dto.ids ?? []);
    return rsj(result ?? {});
  } catch (error) {
    return rfj(error as Error);
  }
});

dictRouter.get("/dict/check", requirePermission("system:dict:read"), async (c) => {
  try {
    const db = getD1Db(c);
    const result = await dict.checkIntegrity(db);
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});
