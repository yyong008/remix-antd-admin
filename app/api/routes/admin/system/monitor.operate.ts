import { Hono } from "hono";

import type { HonoEnv } from "../../../types";
import { operateDAL } from "~/dals/operate/operateDAL";
import { getSearchParamsPage, getSearchParamsPageSize } from "~/utils/server";
import { rfj, rsj } from "~/utils/server/response-json";

export const monitorOperateRouter = new Hono<HonoEnv>();

monitorOperateRouter.get("/monitor/operate", async (c) => {
  try {
    const req = c.req.raw;
    const page = getSearchParamsPage(req);
    const pageSize = getSearchParamsPageSize(req);
    const total = await operateDAL.getOperatesCount({ where: {} });
    const list = await operateDAL.getOperates({
      where: {},
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { id: "desc" } as any,
    });
    return rsj({ total, list });
  } catch (error) {
    return rfj(error as Error);
  }
});

monitorOperateRouter.post("/monitor/operate", async (c) => {
  try {
    const dto = await c.req.json();
    const result = await operateDAL.createOperate(dto);
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

monitorOperateRouter.put("/monitor/operate", async () => {
  return rfj({}, "Unsupport", { status: 501 });
});

monitorOperateRouter.delete("/monitor/operate", async (c) => {
  try {
    const dto = await c.req.json();
    const result = await operateDAL.deleteByIdsOperate(dto.ids ?? []);
    return rsj(result ?? {});
  } catch (error) {
    return rfj(error as Error);
  }
});
