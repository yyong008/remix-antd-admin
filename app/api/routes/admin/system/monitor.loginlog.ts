import { Hono } from "hono";

import type { HonoEnv } from "../../../types";
import { loginLogDAL } from "~/dals/system/LoginLogDAL";
import { getSearchParams, getSearchParamsPage, getSearchParamsPageSize } from "~/utils/server";
import { rfj, rsj } from "~/utils/server/response-json";

export const monitorLoginLogRouter = new Hono<HonoEnv>();

monitorLoginLogRouter.get("/monitor/loginlog", async (c) => {
  try {
    const req = c.req.raw;
    const page = getSearchParamsPage(req);
    const pageSize = getSearchParamsPageSize(req);
    const name = getSearchParams(req, "name") ?? "";
    const total = await loginLogDAL.getCount();
    const list = await loginLogDAL.getLoginLogList({ page, pageSize, name });
    return rsj({ total, list });
  } catch (error) {
    return rfj(error as Error);
  }
});

monitorLoginLogRouter.post("/monitor/loginlog", async (c) => {
  try {
    const dto = await c.req.json();
    const result = await loginLogDAL.create(dto);
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

monitorLoginLogRouter.put("/monitor/loginlog", async () => {
  return rfj({}, "Unsupport", { status: 501 });
});

monitorLoginLogRouter.delete("/monitor/loginlog", async (c) => {
  try {
    const dto = await c.req.json();
    const result = await loginLogDAL.deleteByIds(dto.ids ?? []);
    return rsj(result ?? {});
  } catch (error) {
    return rfj(error as Error);
  }
});
