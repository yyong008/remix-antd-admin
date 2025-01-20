import { blogCategoryDAL, blogDAL, blogTagDAL } from "~/dals/blog";

import { ReactRouterApi } from "../ReactRouterApi";
import { joseJwt } from "~/libs/jose";
import { urlSearchParams } from "~/utils/server/search";

export const blogRouter = new ReactRouterApi();

///////////////////////////////////////// blog /////////////////////////////////////////////////////////////////

blogRouter.get("/blog", async (c) => {
  try {
    const args = c.reactRouterArgs;
    const payload = await joseJwt.getTokenUserIdByArgs(args);
    const categoryId = urlSearchParams.getCategoryId(args.request);
    const tagId = urlSearchParams.getTagId(args.request);

    const total = await blogDAL.getCount();
    const list = await blogDAL.getListByIds({
      page: urlSearchParams.getPage(args.request) || 1,
      pageSize: urlSearchParams.getPageSize(args.request) || 10,
      userId: payload.userId,
      categoryId,
      tagId,
    });

    return c.js({
      total,
      list,
    });
  } catch (error) {
    return c.jf(error as Error);
  }
});

/**
 * 根据 id 获取博客
 */
blogRouter.get("/blog/:id", async (c) => {
  try {
    const args = c.reactRouterArgs;
    const id = Number(args.params.id);
    const result = await blogDAL.getById(id);
    return c.js(result);
  } catch (error) {
    return c.jf(error as Error);
  }
});

/**
 * 创建博客
 */
blogRouter.post("/blog", async (c) => {
  try {
    const args = c.reactRouterArgs;
    const dto = await args.request.json();
    const payload = await joseJwt.getTokenUserIdByArgs(args);
    const data = {
      ...dto,
      publishedAt: new Date(dto.publishedAt),
      userId: payload.userId,
    };
    const result = await blogDAL.create(data);
    return c.js(result);
  } catch (error) {
    return c.jf(error as Error);
  }
});

/**
 * 更新博客
 */
blogRouter.put("/blog/:id", async (c) => {
  try {
    const args = c.reactRouterArgs;
    const dto = await args.request.json();
    const payload = await joseJwt.getTokenUserIdByArgs(args);
    const data = {
      ...dto,
      publishedAt: new Date(dto.publishedAt),
      userId: payload.userId,
    };
    const result = await blogDAL.update(data);
    return c.js(result);
  } catch (error) {
    return c.jf(error as Error);
  }
});

/**
 * 根据 id 删除博客
 */
blogRouter.delete("/blog/:id", async (c) => {
  // TODO
});

/**
 * 批量删除博客
 */
blogRouter.delete("blog", async (c) => {
  try {
    const args = c.reactRouterArgs;
    const { ids } = await args.request.json();
    const result = await blogDAL.deleteByIds(ids);
    return c.js(result);
  } catch (error) {
    return c.jf(error as Error);
  }
});

///////////////////////////////////////// blog tag /////////////////////////////////////////////////////////////////
/**
 * 获取博客标签列表
 */
blogRouter.get("/blog/tag", async (c) => {
  try {
    const args = c.reactRouterArgs;
    const payload = await joseJwt.getTokenUserIdByArgs(args);
    const total = await blogTagDAL.getCount();
    const list = await blogTagDAL.getByUserId(payload.userId!);
    return c.js({ total, list });
  } catch (error) {
    return c.jf(error as Error);
  }
});
blogRouter.get("/blog/tag/:id", async (c) => {
  //
});

/**
 * 创建博客标签
 */
blogRouter.post("/blog/tag", async (c) => {
  try {
    const args = c.reactRouterArgs;
    const dto = await args.request.json();
    const payload = await joseJwt.getTokenUserIdByArgs(args);

    const data = {
      ...dto,
      publishedAt: new Date(dto.publishedAt),
      userId: payload.userId,
    };
    const result = await blogTagDAL.create(data);
    return c.js(result);
  } catch (error) {
    return c.jf(error as Error);
  }
});

/**
 * 更新博客标签
 */
blogRouter.put("/blog/tag", async (c) => {
  try {
    const args = c.reactRouterArgs;
    const dto = await args.request.json();
    const payload = await joseJwt.getTokenUserIdByArgs(args);
    const data = {
      ...dto,
      publishedAt: new Date(dto.publishedAt),
      userId: payload.userId,
    };
    const result = await blogTagDAL.update(data);
    return result;
  } catch (error) {
    return c.jf(error as Error);
  }
});

/**
 * 根据 id 删除博客标签
 */
blogRouter.delete("/blog/tag/:id", async (c) => {
  //
});

/**
 * 批量删除博客标签
 */
blogRouter.delete("/blog/tag", async (c) => {
  try {
    const args = c.reactRouterArgs;
    const { ids } = await args.request.json();
    const result = await blogTagDAL.deleteBlogTagByIds(ids);
    return c.js(result);
  } catch (error) {
    return c.jf(error as Error);
  }
});

///////////////////////////////////////// blog category /////////////////////////////////////////////////////////////////
/**
 * 获取博客分类列表
 */
blogRouter.get("/blog/category", async (c) => {
  try {
    const args = c.reactRouterArgs;
    const payload = await joseJwt.getTokenUserIdByArgs(args);
    const total = await blogCategoryDAL.getCount();
    const list = await blogCategoryDAL.getListByUserId(payload.userId);
    const result = {
      total,
      list,
    };
    return c.json(result);
  } catch (error) {
    return c.jf(error as Error);
  }
});

/**
 * 根据 id 获取分类
 */
blogRouter.get("/blog/category/:id", async (c) => {
  // TODO:
});

/**
 * 创建博客分类
 */
blogRouter.post("/blog/category", async (c) => {
  try {
    const args = c.reactRouterArgs;
    const dto = await args.request.json();
    const payload = await joseJwt.getTokenUserIdByArgs(args);
    const data = {
      ...dto,
      userId: payload.userId,
    };
    const result = await blogCategoryDAL.create(data);
    return c.js(result);
  } catch (error) {
    return c.jf(error as Error);
  }
});

/**
 * 根据 id 获取分类
 */
blogRouter.put("/blog/category/:id", async (c) => {
  try {
    const args = c.reactRouterArgs;
    const dto = await args.request.json();
    const payload = await joseJwt.getTokenUserIdByArgs(args);
    const data = {
      ...dto,
      userId: payload.userId,
    };
    const result = await blogCategoryDAL.update(data);
    return c.js(result);
  } catch (error) {
    return c.jf(error as Error);
  }
});

/**
 * 根据 id 删除分类
 */
blogRouter.delete("/blog/category/:id", async (c) => {
  // TODO:
});

/**
 * 批量删除
 */
blogRouter.delete("/blog/category", async (c) => {
  try {
    const args = c.reactRouterArgs;
    const { ids } = await args.request.json();
    const result = await blogCategoryDAL.deleteByIds(ids);
    return c.js(result);
  } catch (error) {
    return c.jf(error as Error);
  }
});
