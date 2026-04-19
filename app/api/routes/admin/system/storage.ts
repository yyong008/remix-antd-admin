import { Hono } from "hono";

import type { HonoEnv } from "../../../types";
import { createStorageDAL } from "~/dals/tools/StorageDAL";
import { deleteObject, resolveStorageKey } from "~/libs/storage/s3";
import { getSearchParamsPage, getSearchParamsPageSize } from "~/utils/server";
import { rfj, rsj } from "~/utils/server/response-json";
import { getD1Db } from "~/api/helpers/d1";

export const systemStorageRouter = new Hono<HonoEnv>();

systemStorageRouter.get("/storage", async (c) => {
  try {
    const db = getD1Db(c);
    const storageDAL = createStorageDAL(db);
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

systemStorageRouter.get("/storage/:id", async (c) => {
  try {
    const db = getD1Db(c);
    const storageDAL = createStorageDAL(db);
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

systemStorageRouter.post("/storage", async (c) => {
  try {
    const db = getD1Db(c);
    const storageDAL = createStorageDAL(db);
    const dto = await c.req.json();
    const result = await storageDAL.create(dto);
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

systemStorageRouter.put("/storage", async (c) => {
  try {
    const db = getD1Db(c);
    const storageDAL = createStorageDAL(db);
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

systemStorageRouter.delete("/storage", async (c) => {
  try {
    const db = getD1Db(c);
    const storageDAL = createStorageDAL(db);
    const dto = await c.req.json();
    const deleted = await storageDAL.deleteByIds(dto.ids ?? []);
    for (const item of deleted ?? []) {
      const key = resolveStorageKey({
        fileName: item.fileName,
        path: item.path,
      });
      if (key) {
        await deleteObject(key);
      }
    }
    const result = { count: deleted?.length ?? 0 };
    return rsj(result ?? {});
  } catch (error) {
    return rfj(error as Error);
  }
});
