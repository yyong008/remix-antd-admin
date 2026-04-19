import { Hono } from "hono";

import type { HonoEnv } from "../../../types";
import { createMenuRoleDAL } from "~/dals/system/MenuRoleDAL";
import { rfj, rsj } from "~/utils/server/response-json";
import { getD1Db } from "~/api/helpers/d1";

export const menuRoleRouter = new Hono<HonoEnv>();

menuRoleRouter.get("/menu-role", async (c) => {
  try {
    const db = getD1Db(c);
    const menuRoleDAL = createMenuRoleDAL(db);
    const total = await menuRoleDAL.getCount();
    const list = await menuRoleDAL.getList();
    return rsj({ total, list });
  } catch (error) {
    return rfj(error as Error);
  }
});
