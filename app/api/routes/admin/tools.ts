import { Hono } from "hono";

import type { HonoEnv } from "../../types";
import { mailTemplateDAL } from "~/dals/tools/MailDAL";
import { storageDAL } from "~/dals/tools/StorageDAL";
import { getSearchParamsPage, getSearchParamsPageSize } from "~/utils/server";
import { rfj, rsj } from "~/utils/server/response-json";

export const toolsRouter = new Hono<HonoEnv>();

toolsRouter.get("/mail", async (c) => {
  try {
    const req = c.req.raw;
    const page = getSearchParamsPage(req);
    const pageSize = getSearchParamsPageSize(req);
    const total = await mailTemplateDAL.getCount();
    const list = await mailTemplateDAL.getList({
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

toolsRouter.get("/mail/:id", async (c) => {
  try {
    const id = Number(c.req.param("id"));
    if (!id) {
      return rfj({}, "Invalid Mail Id", { status: 400 });
    }
    const result = await mailTemplateDAL.getById(id);
    return rsj(result ?? {});
  } catch (error) {
    return rfj(error as Error);
  }
});

toolsRouter.post("/mail", async (c) => {
  try {
    const dto = await c.req.json();
    const result = await mailTemplateDAL.create(dto);
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

toolsRouter.put("/mail", async (c) => {
  try {
    const dto = await c.req.json();
    if (!dto.id) {
      return rfj({}, "Invalid Mail Id", { status: 400 });
    }
    const result = await mailTemplateDAL.update(dto.id, dto);
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

toolsRouter.delete("/mail", async (c) => {
  try {
    const dto = await c.req.json();
    const result = await mailTemplateDAL.deleteByIds(dto.ids ?? []);
    return rsj(result ?? {});
  } catch (error) {
    return rfj(error as Error);
  }
});

toolsRouter.get("/storage", async (c) => {
  try {
    const req = c.req.raw;
    const page = getSearchParamsPage(req);
    const pageSize = getSearchParamsPageSize(req);
    const total = await storageDAL.getCount();
    const list = await storageDAL.getList({
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

toolsRouter.get("/storage/:id", async (c) => {
  try {
    const id = Number(c.req.param("id"));
    if (!id) {
      return rfj({}, "Invalid Storage Id", { status: 400 });
    }
    const result = await storageDAL.getById(id);
    return rsj(result ?? {});
  } catch (error) {
    return rfj(error as Error);
  }
});

toolsRouter.post("/storage", async (c) => {
  try {
    const dto = await c.req.json();
    const result = await storageDAL.create(dto);
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

toolsRouter.put("/storage", async (c) => {
  try {
    const dto = await c.req.json();
    if (!dto.id) {
      return rfj({}, "Invalid Storage Id", { status: 400 });
    }
    const result = await storageDAL.update(dto.id, dto);
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

toolsRouter.delete("/storage", async (c) => {
  try {
    const dto = await c.req.json();
    const result = await storageDAL.deleteByIds(dto.ids ?? []);
    return rsj(result ?? {});
  } catch (error) {
    return rfj(error as Error);
  }
});
