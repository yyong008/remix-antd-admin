import { Hono } from "hono";

import type { HonoEnv } from "../../../types";
import { createDeptDAL } from "~/dals/system/DeptDAL";
import { getSearchParamsPage, getSearchParamsPageSize } from "~/utils/server";
import { rfj, rsj } from "~/utils/server/response-json";
import { getD1Db } from "~/api/helpers/d1";

export const deptRouter = new Hono<HonoEnv>();

deptRouter.get("/dept", async (c) => {
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

deptRouter.post("/dept", async (c) => {
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

deptRouter.put("/dept", async (c) => {
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

deptRouter.delete("/dept", async (c) => {
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
