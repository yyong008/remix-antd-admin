import { Hono } from "hono";

import type { HonoEnv } from "../types";
import { createBlogDAL, createBlogCategoryDAL } from "~/dals/blog";
import { getD1Db } from "~/api/helpers/d1";
import { rsj } from "~/utils/server/response-json";

export const blogRouter = new Hono<HonoEnv>();

blogRouter.get("/", async (c) => {
  try {
    const db = getD1Db(c);
    const blogDAL = createBlogDAL(db);
    const list = await blogDAL.getPublicList();
    return rsj({ total: list.length, list });
  } catch (error) {
    return c.json({ code: 500, msg: String(error) }, 500);
  }
});

blogRouter.get("/category", async (c) => {
  try {
    const db = getD1Db(c);
    const blogCategoryDAL = createBlogCategoryDAL(db);
    const list = await blogCategoryDAL.getAll();
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
    const blogDAL = createBlogDAL(db);
    const blogCategoryDAL = createBlogCategoryDAL(db);
    const blogTagDAL = (await import("~/dals/blog/BlogTagDAL")).createBlogTagDAL(db);
    const result = await blogDAL.getById(id);
    if (!result) {
      return c.json({ code: 404, msg: "Blog not found" }, 404);
    }
    // Fetch category and tag names
    const [category, tag] = await Promise.all([
      blogCategoryDAL.getById(result.categoryId),
      blogTagDAL.getById(result.tagId),
    ]);
    return rsj({ ...result, categoryName: category?.name, tagName: tag?.name });
  } catch (error) {
    return c.json({ code: 500, msg: String(error) }, 500);
  }
});
