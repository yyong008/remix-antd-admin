import * as news from "@workspace/database/repositories/news/news";
import * as newsCategory from "@workspace/database/repositories/news/news-category";
import { Hono } from "hono";

import type { HonoEnv } from "../types";
import { getD1Db } from "../helpers/d1";
import { rsj, rfj } from "../utils/server/response-json";

const SYSTEM_USER_ID = "system-user";

export const newsRouter = new Hono<HonoEnv>();

newsRouter.get("/", async (c) => {
  try {
    const db = getD1Db(c);
    const req = c.req.raw;
    const page = Number(new URL(req.url).searchParams.get("page") ?? 1);
    const pageSize = Number(new URL(req.url).searchParams.get("pageSize") ?? 10);
    const total = await news.getPublicCount(db);
    const list = await news.getPublicList(db, { page, pageSize });
    return rsj({ total, list });
  } catch (error) {
    return c.json({ code: 500, msg: String(error) }, 500);
  }
});

newsRouter.post("/", async (c) => {
  try {
    const db = getD1Db(c);
    const dto = await c.req.json();
    const result = await news.create(db, { ...dto, userId: SYSTEM_USER_ID });
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

newsRouter.put("/", async (c) => {
  try {
    const db = getD1Db(c);
    const dto = await c.req.json();
    const result = await news.update(db, { ...dto, userId: SYSTEM_USER_ID });
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

newsRouter.delete("/", async (c) => {
  try {
    const db = getD1Db(c);
    const dto = await c.req.json();
    const result = await news.deleteByIds(db, dto.ids ?? []);
    return rsj(result ?? {});
  } catch (error) {
    return rfj(error as Error);
  }
});

newsRouter.put("/toggle-status", async (c) => {
  try {
    const db = getD1Db(c);
    const dto = await c.req.json();
    const { id } = dto;
    if (!id) {
      return rfj({}, "Missing news id", { status: 400 });
    }
    const result = await news.toggleStatus(db, id);
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

newsRouter.get("/category", async (c) => {
  try {
    const db = getD1Db(c);
    const list = await newsCategory.getPublicList(db);
    return rsj({ total: list.length, list });
  } catch (error) {
    return c.json({ code: 500, msg: String(error) }, 500);
  }
});

newsRouter.get("/category/all", async (c) => {
  try {
    const db = getD1Db(c);
    const list = await newsCategory.getAll(db);
    return rsj({ total: list.length, list });
  } catch (error) {
    return c.json({ code: 500, msg: String(error) }, 500);
  }
});

newsRouter.post("/category", async (c) => {
  try {
    const db = getD1Db(c);
    const body = (await c.req.json()) as Record<string, unknown>;
    const result = await newsCategory.create(db, {
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
    const body = (await c.req.json()) as Record<string, unknown>;
    const id = body.id != null ? String(body.id).trim() : "";
    if (!id) {
      return rfj({}, "Missing category ID", { status: 400 });
    }
    const result = await newsCategory.update(db, {
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
    const dto = await c.req.json();
    const result = await newsCategory.deleteByIds(db, dto.ids ?? []);
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
    const result = await news.getNewsById(db, id);
    if (!result) {
      return c.json({ code: 404, msg: "News not found" }, 404);
    }
    if (result.status !== 1) {
      return c.json({ code: 404, msg: "News not found" }, 404);
    }
    const category = await newsCategory.getById(db, result.newsId);
    if (!category || !category.visible) {
      return c.json({ code: 404, msg: "News not found" }, 404);
    }
    return rsj({ ...result, categoryName: category?.name });
  } catch (error) {
    return c.json({ code: 500, msg: String(error) }, 500);
  }
});
