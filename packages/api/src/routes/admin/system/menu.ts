import * as menu from "@workspace/database/repositories/system/menu";
import { Hono } from "hono";

import type { HonoEnv } from "../../../types";
import { requirePermission } from "../../../middleware/rbac";
import { getSearchParamsPage, getSearchParamsPageSize } from "../../../utils/server";
import { rfj, rsj } from "../../../utils/server/response-json";
import { getD1Db } from "../../../helpers/d1";

export const menuRouter = new Hono<HonoEnv>();

menuRouter.get("/menu", requirePermission("system:menu:read"), async (c) => {
  try {
    const db = getD1Db(c);
    const req = c.req.raw;
    const page = getSearchParamsPage(req);
    const pageSize = getSearchParamsPageSize(req);
    const total = await menu.getCount(db);
    const list = await menu.getList(db, { page, pageSize });
    return rsj({ total, list });
  } catch (error) {
    return rfj(error as Error);
  }
});

menuRouter.get("/menu-list", requirePermission("system:menu:read"), async (c) => {
  try {
    const db = getD1Db(c);
    const list = await menu.getAllFilterPermMenu(db);
    return rsj({ list });
  } catch (error) {
    return rfj(error as Error);
  }
});

menuRouter.post("/menu", requirePermission("system:menu:create"), async (c) => {
  try {
    const db = getD1Db(c);
    const dto = await c.req.json();
    const result = await menu.create(db, dto);
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

menuRouter.put("/menu", requirePermission("system:menu:update"), async (c) => {
  try {
    const db = getD1Db(c);
    const dto = await c.req.json();
    const result = await menu.update(db, dto);
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

menuRouter.delete("/menu", requirePermission("system:menu:delete"), async (c) => {
  try {
    const db = getD1Db(c);
    const dto = await c.req.json();
    const result = await menu.deleteByIds(db, dto.ids ?? []);
    return rsj(result ?? {});
  } catch (error) {
    return rfj(error as Error);
  }
});
