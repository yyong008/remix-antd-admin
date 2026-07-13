import * as blog from "@workspace/database/repositories/blog/blog";
import * as blogCategory from "@workspace/database/repositories/blog/blog-category";
import * as blogTag from "@workspace/database/repositories/blog/blog-tag";
import { Hono } from "hono";

import type { HonoEnv } from "../types";
import { getD1Db } from "../helpers/d1";
import { rsj } from "../utils/server/response-json";

export const blogRouter = new Hono<HonoEnv>();

blogRouter.get("/", async (c) => {
  try {
    const db = getD1Db(c);
    const list = await blog.getPublicList(db);
    return rsj({ total: list.length, list });
  } catch (error) {
    return c.json({ code: 500, msg: String(error) }, 500);
  }
});

blogRouter.get("/category", async (c) => {
  try {
    const db = getD1Db(c);
    const list = await blogCategory.getPublicList(db);
    return rsj({ total: list.length, list });
  } catch (error) {
    return c.json({ code: 500, msg: String(error) }, 500);
  }
});

blogRouter.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    if (!id) {
      return c.json({ code: 400, msg: "Invalid Blog Id" }, 400);
    }
    const db = getD1Db(c);
    const result = await blog.getById(db, id);
    if (!result) {
      return c.json({ code: 404, msg: "Blog not found" }, 404);
    }
    if (!result.isPublished) {
      return c.json({ code: 404, msg: "Blog not found" }, 404);
    }
    const category = await blogCategory.getById(db, result.categoryId);
    if (!category || !category.showOnClient) {
      return c.json({ code: 404, msg: "Blog not found" }, 404);
    }
    const tag = await blogTag.getById(db, result.tagId);
    return rsj({ ...result, categoryName: category?.name, tagName: tag?.name });
  } catch (error) {
    return c.json({ code: 500, msg: String(error) }, 500);
  }
});
