import { Hono } from "hono";

import type { HonoEnv } from "../types";
import { createNewsDAL } from "@workspace/database/dals/news/NewsDAL";
import { createNewsCategoryDAL } from "@workspace/database/dals/news/NewsCategoryDAL";
import { getD1Db } from "../helpers/d1";
import { rsj, rfj } from "../utils/server/response-json";

const SYSTEM_USER_ID = "system-user";

export const newsRouter = new Hono<HonoEnv>();

newsRouter.get("/", async (c) => {
  try {
    const db = getD1Db(c);
    const newsDAL = createNewsDAL(db);
    const req = c.req.raw;
    const page = Number(new URL(req.url).searchParams.get("page") ?? 1);
    const pageSize = Number(new URL(req.url).searchParams.get("pageSize") ?? 10);
    const total = await newsDAL.getPublicCount();
    const list = await newsDAL.getPublicList({ page, pageSize });
    return rsj({ total, list });
  } catch (error) {
    return c.json({ code: 500, msg: String(error) }, 500);
  }
});

newsRouter.post("/", async (c) => {
  try {
    const db = getD1Db(c);
    const newsDAL = createNewsDAL(db);
    const dto = await c.req.json();
    const result = await newsDAL.create({ ...dto, userId: SYSTEM_USER_ID });
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

newsRouter.put("/", async (c) => {
  try {
    const db = getD1Db(c);
    const newsDAL = createNewsDAL(db);
    const dto = await c.req.json();
    const result = await newsDAL.update({ ...dto, userId: SYSTEM_USER_ID });
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

newsRouter.delete("/", async (c) => {
  try {
    const db = getD1Db(c);
    const newsDAL = createNewsDAL(db);
    const dto = await c.req.json();
    const result = await newsDAL.deleteByIds(dto.ids ?? []);
    return rsj(result ?? {});
  } catch (error) {
    return rfj(error as Error);
  }
});

newsRouter.put("/toggle-status", async (c) => {
  try {
    const db = getD1Db(c);
    const newsDAL = createNewsDAL(db);
    const dto = await c.req.json();
    const { id } = dto;
    if (!id) {
      return rfj({}, "Missing news id", { status: 400 });
    }
    const result = await newsDAL.toggleStatus(id);
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

newsRouter.get("/category", async (c) => {
  try {
    const db = getD1Db(c);
    const newsCategoryDAL = createNewsCategoryDAL(db);
    const list = await newsCategoryDAL.getPublicList();
    return rsj({ total: list.length, list });
  } catch (error) {
    return c.json({ code: 500, msg: String(error) }, 500);
  }
});

newsRouter.get("/category/all", async (c) => {
  try {
    const db = getD1Db(c);
    const newsCategoryDAL = createNewsCategoryDAL(db);
    const list = await newsCategoryDAL.getAll();
    return rsj({ total: list.length, list });
  } catch (error) {
    return c.json({ code: 500, msg: String(error) }, 500);
  }
});

newsRouter.post("/category", async (c) => {
  try {
    const db = getD1Db(c);
    const newsCategoryDAL = createNewsCategoryDAL(db);
    const body = (await c.req.json()) as Record<string, unknown>;
    const result = await newsCategoryDAL.create({
      name: body.name,
      description: body.description,
      visible: body.visible,
      userId: SYSTEM_USER_ID,
    });
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

newsRouter.put("/category", async (c) => {
  try {
    const db = getD1Db(c);
    const newsCategoryDAL = createNewsCategoryDAL(db);
    const body = (await c.req.json()) as Record<string, unknown>;
    const id = body.id != null ? String(body.id).trim() : "";
    if (!id) {
      return rfj({}, "Missing category ID", { status: 400 });
    }
    const result = await newsCategoryDAL.update({
      id,
      name: body.name,
      description: body.description,
      visible: body.visible,
      userId: SYSTEM_USER_ID,
    });
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

newsRouter.delete("/category", async (c) => {
  try {
    const db = getD1Db(c);
    const newsCategoryDAL = createNewsCategoryDAL(db);
    const dto = await c.req.json();
    const result = await newsCategoryDAL.deleteByIds(dto.ids ?? []);
    return rsj(result ?? {});
  } catch (error) {
    return rfj(error as Error);
  }
});

newsRouter.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    if (!id) {
      return c.json({ code: 400, msg: "Invalid News Id" }, 400);
    }
    const db = getD1Db(c);
    const newsDAL = createNewsDAL(db);
    const newsCategoryDAL = createNewsCategoryDAL(db);
    const result = await newsDAL.getNewsById(id);
    if (!result) {
      return c.json({ code: 404, msg: "News not found" }, 404);
    }
    if (result.status !== 1) {
      return c.json({ code: 404, msg: "News not found" }, 404);
    }
    const category = await newsCategoryDAL.getById(result.newsId);
    if (!category || !category.visible) {
      return c.json({ code: 404, msg: "News not found" }, 404);
    }
    return rsj({ ...result, categoryName: category?.name });
  } catch (error) {
    return c.json({ code: 500, msg: String(error) }, 500);
  }
});
