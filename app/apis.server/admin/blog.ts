import { blogCategoryDAL, blogDAL, blogTagDAL } from "~/dals/blog";

import { Context, Hono } from "hono";
import { joseJwt } from "~/libs/jose";
import { urlSearchParams } from "~/utils/server/search";

export const blogRouter = new Hono();

///////////////////////////////////////// blog /////////////////////////////////////////////////////////////////

blogRouter.get("/blog", async (c) => {
  try {
    const req = c.req.raw;
    const payload = await joseJwt.getTokenUserIdByArgs({ request: req });
    const categoryId = urlSearchParams.getCategoryId(req);
    const tagId = urlSearchParams.getTagId(req);

    const total = await blogDAL.getCount();
    const list = await blogDAL.getListByIds({
      page: urlSearchParams.getPage(req) || 1,
      pageSize: urlSearchParams.getPageSize(req) || 10,
      userId: payload.userId,
      categoryId,
      tagId,
    });

    return c.json({
      data: {
        total,
        list,
      },
      message: "success",
      code: 0,
    });
  } catch (error) {
    return c.json({
      data: null,
      message: (error as Error).message ?? "获取失败",
      code: 1,
    });
  }
});

/**
 * 根据 id 获取博客
 */
blogRouter.get("/blog/:id", async (c) => {
  try {
    const id = Number(c.req.param("id"));
    const result = await blogDAL.getById(id);
    return c.json({
      data: result,
      message: "success",
      code: 0,
    });
  } catch (error) {
    return c.json({
      data: null,
      message: (error as Error).message ?? "获取失败",
      code: 1,
    });
  }
});

/**
 * 创建博客
 */
blogRouter.post("/blog", async (c) => {
  try {
    const req = c.req.raw;
    const dto = await req.json();
    const payload = await joseJwt.getTokenUserIdByArgs({ request: req });
    const data = {
      ...dto,
      publishedAt: new Date(dto.publishedAt),
      userId: payload.userId,
    };
    const result = await blogDAL.create(data);
    return c.json({
      data: result,
      message: "success",
      code: 0,
    });
  } catch (error) {
    return c.json({
      data: null,
      message: (error as Error).message ?? "获取失败",
      code: 1,
    });
  }
});

/**
 * 更新博客
 */
blogRouter.put("/blog/:id", async (c) => {
  try {
    const req = c.req.raw;
    const dto = await req.json();
    const payload = await joseJwt.getTokenUserIdByArgs({ request: req });
    const data = {
      ...dto,
      publishedAt: new Date(dto.publishedAt),
      userId: payload.userId,
    };
    const result = await blogDAL.update(data);
    return c.json({
      data: result,
      message: "success",
      code: 0,
    });
  } catch (error) {
    return c.json({
      data: null,
      message: (error as Error).message ?? "获取失败",
      code: 1,
    });
  }
});

/**
 * 根据 id 删除博客
 */
blogRouter.delete("/blog/:id", async (c) => {
  // TODO
  try {
    const id = Number(c.req.param("id"));
    const result = await blogDAL.deleteByIds([id]);
    return c.json({
      data: result,
      message: "success",
      code: 0,
    });
  } catch (error) {
    return c.json({
      data: null,
      message: (error as Error).message ?? "获取失败",
      code: 1,
    });
  }
});

/**
 * 批量删除博客
 */
blogRouter.delete("blog", async (c) => {
  try {
    const {ids} = await c.req.json();
    const result = await blogDAL.deleteByIds(ids);
    return c.json({
      data: result,
      message: "success",
      code: 0,
    });
  } catch (error) {
    return c.json({
      data: null,
      message: (error as Error).message ?? "获取失败",
      code: 1,
    });
  }
});

///////////////////////////////////////// blog tag /////////////////////////////////////////////////////////////////
/**
 * 获取博客标签列表
 */
blogRouter.get("/blog/tag", async (c) => {
  try {
    const req = c.req.raw;
    const payload = await joseJwt.getTokenUserIdByArgs({ request: req });
    const total = await blogTagDAL.getCount();
    const list = await blogTagDAL.getByUserId(payload.userId!);
    return c.json({
      data: {
        total,
        list,
      },
      message: "success",
      code: 0,
    });
  } catch (error) {
    return c.json({
      data: null,
      message: (error as Error).message ?? "获取失败",
      code: 1,
    });
  }
});
blogRouter.get("/blog/tag/:id", async (c) => {
  // TODO:
  try {
    const id = Number(c.req.param("id"));
    const result = await blogTagDAL.getBlogTagById(id);
    return c.json({
      data: result,
      message: "success",
      code: 0,
    });
  } catch (error) {
    return c.json({
      data: null,
      message: (error as Error).message ?? "获取失败",
      code: 1,
    });
  }
});

/**
 * 创建博客标签
 */
blogRouter.post("/blog/tag", async (c) => {
  try {
    const req = c.req.raw;
    const dto = await req.json();
    const payload = await joseJwt.getTokenUserIdByArgs({ request: req });

    const data = {
      ...dto,
      publishedAt: new Date(dto.publishedAt),
      userId: payload.userId,
    };
    const result = await blogTagDAL.create(data);
    return c.json({
      data: result,
      message: "success",
      code: 0,
    });
  } catch (error) {
    return c.json({
      data: null,
      message: (error as Error).message ?? "获取失败",
      code: 1,
    });
  }
});

/**
 * 更新博客标签
 */
blogRouter.put("/blog/tag", async (c: Context) => {
  try {
    const req = c.req.raw
    const dto = await req.json();
    const payload = await joseJwt.getTokenUserIdByArgs({ request: req });
    const data = {
      ...dto,
      publishedAt: new Date(dto.publishedAt),
      userId: payload.userId,
    };
    const result = await blogTagDAL.update(data);
    return  c.json({
      data: result,
      message: "success",
      code: 0,
    });
  } catch (error) {
      return c.json({
      data: null,
      message: (error as Error).message ?? "获取失败",
      code: 1,
    });
  }
});

/**
 * 根据 id 删除博客标签
 */
blogRouter.delete("/blog/tag/:id", async (c) => {
  // TODO:
  try {
    const id = Number(c.req.param("id"));
    const result = await blogTagDAL.deleteBlogTagByIds([id]);
    return c.json({
      data: result,
      message: "success",
      code: 0,
    });
  } catch (error) {
    return c.json({
      data: null,
      message: (error as Error).message ?? "获取失败",
      code: 1,
    });
  }
});

  /**
 * 批量删除博客标签
 */
blogRouter.delete("/blog/tag", async (c) => {
  try {
    const req = c.req.raw;
    const {ids} = await req.json();
    const result = await blogTagDAL.deleteBlogTagByIds(ids);
    return c.json({
      data: result,
      message: "success",
      code: 0,
    });
  } catch (error) {
    return c.json({
      data: null,
      message: (error as Error).message ?? "获取失败",
      code: 1,
    });
  }
  });

///////////////////////////////////////// blog category /////////////////////////////////////////////////////////////////
/**
 * 获取博客分类列表
 */
blogRouter.get("/blog/category", async (c) => {
  try {
    const req = c.req.raw;
    const payload = await joseJwt.getTokenUserIdByArgs({ request: req });
    const total = await blogCategoryDAL.getCount();
    const list = await blogCategoryDAL.getListByUserId(payload.userId);
    const result = {
      total,
      list,
    };
      return c.json({
      data: result,
      message: "success",
      code: 0,
    });
  } catch (error) {
    return c.json({
      data: null,
      message: (error as Error).message ?? "获取失败",
      code: 1,
    });
  }
});

/**
 * 根据 id 获取分类
 */
blogRouter.get("/blog/category/:id", async (c) => {
  // TODO:
  try {
    const id = Number(c.req.param("id"));
    const result = await blogCategoryDAL.getById(id);
    return c.json({
      data: result,
      message: "success",
      code: 0,
    });
  } catch (error) {
    return c.json({
      data: null,
      message: (error as Error).message ?? "获取失败",
      code: 1,
    });
  }
});
/**
 * 创建博客分类
 */
blogRouter.post("/blog/category", async (c) => {
  try {
    const req = c.req.raw;
    const dto = await req.json();
    const payload = await joseJwt.getTokenUserIdByArgs({ request: req });
    const data = {
      ...dto,
      userId: payload.userId,
    };
    const result = await blogCategoryDAL.create(data);
    return c.json({
      data: result,
      message: "success",
      code: 0,
    });
  } catch (error) {
      return c.json({
      data: null,
      message: (error as Error).message ?? "获取失败",
      code: 1,
    });
  }
});

/**
 * 根据 id 获取分类
 */
blogRouter.put("/blog/category/:id", async (c) => {
  try {
    const req = c.req.raw;
    const dto = await req.json();
    const payload = await joseJwt.getTokenUserIdByArgs({ request: req });
    const data = {
      ...dto,
      userId: payload.userId,
    };
    const result = await blogCategoryDAL.update(data);
    return c.json({
      data: result,
      message: "success",
      code: 0,
    });
  } catch (error) {
    return c.json({
      data: null,
      message: (error as Error).message ?? "获取失败",
      code: 1,
    });
  }
});

/**
 * 根据 id 删除分类
 */
blogRouter.delete("/blog/category/:id", async (c) => {
  try {
    const id = Number(c.req.param("id"));
    const result = await blogCategoryDAL.deleteByIds([id]);
    return c.json({
      data: result,
      message: "success",
      code: 0,
    });
  } catch (error) {
    return c.json({
      data: null,
      message: (error as Error).message ?? "获取失败",
      code: 1,
    });
  }
});

/**
 * 批量删除
 */
blogRouter.delete("/blog/category", async (c) => {
  try {
    const req = c.req.raw;
    const { ids } = await req.json();
    const result = await blogCategoryDAL.deleteByIds(ids);
    return c.json({
      data: result,
      message: "success",
      code: 0,
    });
  } catch (error) {
    return c.json({
      data: null,
      message: (error as Error).message ?? "获取失败",
      code: 1,
    });
  }
});
