import { Hono } from "hono";

import type { HonoEnv } from "../types";
import { createNewsDAL } from "~/dals/news/NewsDAL";
import { createNewsCategoryDAL } from "~/dals/news/NewsCategoryDAL";
import { getD1Db } from "~/api/helpers/d1";
import { rsj } from "~/utils/server/response-json";

export const newsRouter = new Hono<HonoEnv>();

// Public news list - only published (status=1) and visible category
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

// Public news category list - only visible categories
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

// Public news detail
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
    // Check if news is published
    if (result.status !== 1) {
      return c.json({ code: 404, msg: "News not found" }, 404);
    }
    // Check if category is visible
    const category = await newsCategoryDAL.getById(result.newsId);
    if (!category || !category.visible) {
      return c.json({ code: 404, msg: "News not found" }, 404);
    }
    return rsj({ ...result, categoryName: category?.name });
  } catch (error) {
    return c.json({ code: 500, msg: String(error) }, 500);
  }
});
