import { Hono } from "hono";

import type { HonoEnv } from "../../../types";
import { menuRoleDAL } from "~/dals/system/MenuRoleDAL";
import { rfj, rsj } from "~/utils/server/response-json";

export const menuRoleRouter = new Hono<HonoEnv>();

menuRoleRouter.get("/menu-role", async () => {
  try {
    const total = await menuRoleDAL.getCount();
    const list = await menuRoleDAL.getList();
    return rsj({ total, list });
  } catch (error) {
    return rfj(error as Error);
  }
});
