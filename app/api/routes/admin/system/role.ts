import { Hono } from "hono";

import type { HonoEnv } from "../../../types";
import { createRoleDAL } from "~/dals/system/RoleDAL";
import { getSearchParamsPage, getSearchParamsPageSize } from "~/utils/server";
import { rfj, rsj } from "~/utils/server/response-json";
import { getD1Db } from "~/api/helpers/d1";

export const roleRouter = new Hono<HonoEnv>();

roleRouter.get("/role", async (c) => {
  try {
    const db = getD1Db(c);
    const roleDAL = createRoleDAL(db);
    const req = c.req.raw;
    const page = getSearchParamsPage(req);
    const pageSize = getSearchParamsPageSize(req);
    const total = await roleDAL.getCount();
    const list = await roleDAL.getList({ page, pageSize });
    return rsj({ total, list });
  } catch (error) {
    return rfj(error as Error);
  }
});

roleRouter.post("/role", async (c) => {
  try {
    const db = getD1Db(c);
    const roleDAL = createRoleDAL(db);
    const dto = await c.req.json();
    const result = await roleDAL.create(dto);
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

roleRouter.put("/role", async (c) => {
  try {
    const db = getD1Db(c);
    const roleDAL = createRoleDAL(db);
    const dto = await c.req.json();
    const result = await roleDAL.update(dto);
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

roleRouter.delete("/role", async (c) => {
  try {
    const db = getD1Db(c);
    const roleDAL = createRoleDAL(db);
    const dto = await c.req.json();
    const result = await roleDAL.deleteByIds(dto.ids ?? []);
    return rsj(result ?? {});
  } catch (error) {
    return rfj(error as Error);
  }
});
