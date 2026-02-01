import { Hono } from "hono";

import type { HonoEnv } from "../../types";
import { newsCategoryDAL } from "~/dals/news/NewsCategoryDAL";
import { newsDAL } from "~/dals/news/NewsDAL";
import { getSearchParams, getSearchParamsPage, getSearchParamsPageSize } from "~/utils/server";
import { rfj, rsj } from "~/utils/server/response-json";

export const newsRouter = new Hono<HonoEnv>();

newsRouter.get("/", async (c) => {
  try {
    const req = c.req.raw;
    const page = getSearchParamsPage(req);
    const pageSize = getSearchParamsPageSize(req);
    const category = Number(getSearchParams(req, "category") ?? 0);
    const total = await newsDAL.getCount();
    const list = category
      ? await newsDAL.getList({ page, pageSize, category })
      : await newsDAL.getPage({ page, pageSize });
    return rsj({ total, list });
  } catch (error) {
    return rfj(error as Error);
  }
});

newsRouter.post("/", async (c) => {
  try {
    const userId = c.get("userId");
    if (!userId) {
      return rfj({}, "No Authorization No User", { status: 401 });
    }
    const dto = await c.req.json();
    const result = await newsDAL.create({ ...dto, userId });
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

newsRouter.put("/", async (c) => {
  try {
    const userId = c.get("userId");
    if (!userId) {
      return rfj({}, "No Authorization No User", { status: 401 });
    }
    const dto = await c.req.json();
    const result = await newsDAL.update({ ...dto, userId });
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

newsRouter.delete("/", async (c) => {
  try {
    const dto = await c.req.json();
    const result = await newsDAL.deleteByIds(dto.ids ?? []);
    return rsj(result ?? {});
  } catch (error) {
    return rfj(error as Error);
  }
});

newsRouter.get("/category", async (c) => {
  try {
    const req = c.req.raw;
    const page = getSearchParamsPage(req);
    const pageSize = getSearchParamsPageSize(req);
    const total = await newsCategoryDAL.getCount();
    const list = await newsCategoryDAL.getList({ page, pageSize });
    return rsj({ total, list });
  } catch (error) {
    return rfj(error as Error);
  }
});

newsRouter.post("/category", async (c) => {
  try {
    const userId = c.get("userId");
    if (!userId) {
      return rfj({}, "No Authorization No User", { status: 401 });
    }
    const dto = await c.req.json();
    const result = await newsCategoryDAL.create({ ...dto, userId });
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

newsRouter.put("/category", async (c) => {
  try {
    const userId = c.get("userId");
    if (!userId) {
      return rfj({}, "No Authorization No User", { status: 401 });
    }
    const dto = await c.req.json();
    const result = await newsCategoryDAL.update({ ...dto, userId });
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

newsRouter.delete("/category", async (c) => {
  try {
    const dto = await c.req.json();
    const result = await newsCategoryDAL.deleteByIds(dto.ids ?? []);
    return rsj(result ?? {});
  } catch (error) {
    return rfj(error as Error);
  }
});

newsRouter.get("/:id", async (c) => {
  try {
    const id = Number(c.req.param("id"));
    if (!id) {
      return rfj({}, "Invalid News Id", { status: 400 });
    }
    const result = await newsDAL.getNewsById(id);
    return rsj(result ?? {});
  } catch (error) {
    return rfj(error as Error);
  }
});
