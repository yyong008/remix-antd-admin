import { Hono } from "hono";

import type { HonoEnv } from "../../../types";
import { createMenuDAL } from "~/dals/system/MenuDAL";
import { getSearchParamsPage, getSearchParamsPageSize } from "~/utils/server";
import { rfj, rsj } from "~/utils/server/response-json";
import { getD1Db } from "~/api/helpers/d1";

export const menuRouter = new Hono<HonoEnv>();

menuRouter.get("/menu", async (c) => {
  try {
    const db = getD1Db(c);
    const menuDAL = createMenuDAL(db);
    const req = c.req.raw;
    const page = getSearchParamsPage(req);
    const pageSize = getSearchParamsPageSize(req);
    const total = await menuDAL.getCount();
    const list = await menuDAL.getList({ page, pageSize });
    return rsj({ total, list });
  } catch (error) {
    return rfj(error as Error);
  }
});

menuRouter.get("/menu-list", async (c) => {
  try {
    const db = getD1Db(c);
    const menuDAL = createMenuDAL(db);
    const list = await menuDAL.getAllFilterPermMenu();
    return rsj({ list });
  } catch (error) {
    return rfj(error as Error);
  }
});

menuRouter.post("/menu", async (c) => {
  try {
    const db = getD1Db(c);
    const menuDAL = createMenuDAL(db);
    const dto = await c.req.json();
    const result = await menuDAL.create(dto);
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

menuRouter.put("/menu", async (c) => {
  try {
    const db = getD1Db(c);
    const menuDAL = createMenuDAL(db);
    const dto = await c.req.json();
    const result = await menuDAL.update(dto);
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

menuRouter.delete("/menu", async (c) => {
  try {
    const db = getD1Db(c);
    const menuDAL = createMenuDAL(db);
    const dto = await c.req.json();
    const result = await menuDAL.deleteByIds(dto.ids ?? []);
    return rsj(result ?? {});
  } catch (error) {
    return rfj(error as Error);
  }
});
