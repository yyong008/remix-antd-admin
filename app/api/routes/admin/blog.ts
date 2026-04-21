import { Hono } from "hono";

import type { HonoEnv } from "../../types";
import { requirePermission } from "~/api/middleware/rbac";
import { createBlogDAL, createBlogCategoryDAL, createBlogTagDAL } from "~/dals/blog";
import { getD1Db } from "../../helpers/d1";
import { getSearchParams, getSearchParamsPage, getSearchParamsPageSize } from "~/utils/server";
import { rfj, rsj } from "~/utils/server/response-json";

export const blogRouter = new Hono<HonoEnv>();

blogRouter.get("/", requirePermission("blog:list:read", "blog:detail:read"), async (c) => {
  try {
    const userId = c.get("userId");
    if (!userId) {
      return rfj({}, "No Authorization No User", { status: 401 });
    }
    const req = c.req.raw;
    const page = getSearchParamsPage(req);
    const pageSize = getSearchParamsPageSize(req);
    const categoryId = Number(getSearchParams(req, "categoryId") ?? 0);
    const tagId = Number(getSearchParams(req, "tagId") ?? 0);
    const db = getD1Db(c);
    const blogDAL = createBlogDAL(db);
    const total = await blogDAL.getCount();
    const list = await blogDAL.getListByIds({
      page,
      pageSize,
      userId,
      categoryId: categoryId || undefined,
      tagId: tagId || undefined,
    });
    return rsj({ total, list });
  } catch (error) {
    return rfj(error as Error);
  }
});

blogRouter.post("/", requirePermission("blog:list:read", "blog:detail:read"), async (c) => {
  try {
    const userId = c.get("userId");
    if (!userId) {
      return rfj({}, "No Authorization No User", { status: 401 });
    }
    const dto = await c.req.json();
    const db = getD1Db(c);
    const blogDAL = createBlogDAL(db);
    const result = await blogDAL.create({
      ...dto,
      publishedAt: new Date(dto.publishedAt),
      userId,
    });
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

blogRouter.delete("/", requirePermission("blog:list:read", "blog:detail:read"), async (c) => {
  try {
    const dto = await c.req.json();
    const db = getD1Db(c);
    const blogDAL = createBlogDAL(db);
    const result = await blogDAL.deleteByIds(dto.ids ?? []);
    return rsj(result ?? {});
  } catch (error) {
    return rfj(error as Error);
  }
});

blogRouter.get("/tag", requirePermission("blog:tag:read", "blog:list:read"), async (c) => {
  try {
    const userId = c.get("userId");
    if (!userId) {
      return rfj({}, "No Authorization No User", { status: 401 });
    }
    const db = getD1Db(c);
    const blogTagDAL = createBlogTagDAL(db);
    const total = await blogTagDAL.getCount();
    const list = await blogTagDAL.getListByUserId(userId);
    return rsj({ total, list });
  } catch (error) {
    return rfj(error as Error);
  }
});

blogRouter.get("/tag/:id", requirePermission("blog:tag:read", "blog:list:read"), async (c) => {
  try {
    const id = c.req.param("id");
    if (!id) {
      return rfj({}, "Invalid Tag Id", { status: 400 });
    }
    const db = getD1Db(c);
    const blogTagDAL = createBlogTagDAL(db);
    const result = await blogTagDAL.getBlogTagById(id);
    return rsj(result ?? {});
  } catch (error) {
    return rfj(error as Error);
  }
});

blogRouter.post("/tag", requirePermission("blog:tag:read", "blog:list:read"), async (c) => {
  try {
    const userId = c.get("userId");
    if (!userId) {
      return rfj({}, "No Authorization No User", { status: 401 });
    }
    const dto = await c.req.json();
    const db = getD1Db(c);
    const blogTagDAL = createBlogTagDAL(db);
    const result = await blogTagDAL.create({ ...dto, userId });
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

blogRouter.put("/tag/:id", requirePermission("blog:tag:read", "blog:list:read"), async (c) => {
  try {
    const userId = c.get("userId");
    if (!userId) {
      return rfj({}, "No Authorization No User", { status: 401 });
    }
    const id = c.req.param("id");
    const dto = await c.req.json();
    const db = getD1Db(c);
    const blogTagDAL = createBlogTagDAL(db);
    const result = await blogTagDAL.update({ ...dto, id, userId });
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

blogRouter.delete("/tag/:id", requirePermission("blog:tag:read", "blog:list:read"), async (c) => {
  try {
    const id = c.req.param("id");
    if (!id) {
      return rfj({}, "Invalid Tag Id", { status: 400 });
    }
    const db = getD1Db(c);
    const blogTagDAL = createBlogTagDAL(db);
    const result = await blogTagDAL.deleteById(id);
    return rsj(result ?? {});
  } catch (error) {
    return rfj(error as Error);
  }
});

blogRouter.delete("/tag", requirePermission("blog:tag:read", "blog:list:read"), async (c) => {
  try {
    const dto = await c.req.json();
    const db = getD1Db(c);
    const blogTagDAL = createBlogTagDAL(db);
    const result = await blogTagDAL.deleteBlogTagByIds(dto.ids ?? []);
    return rsj(result ?? {});
  } catch (error) {
    return rfj(error as Error);
  }
});

blogRouter.get(
  "/category",
  requirePermission("blog:category:read", "blog:list:read"),
  async (c) => {
    try {
      const userId = c.get("userId");
      if (!userId) {
        return rfj({}, "No Authorization No User", { status: 401 });
      }
      const db = getD1Db(c);
      const blogCategoryDAL = createBlogCategoryDAL(db);
      const total = await blogCategoryDAL.getCount();
      const list = await blogCategoryDAL.getListByUserId(userId);
      return rsj({ total, list });
    } catch (error) {
      return rfj(error as Error);
    }
  },
);

blogRouter.get(
  "/category/:id",
  requirePermission("blog:category:read", "blog:list:read"),
  async (c) => {
    try {
      const id = c.req.param("id");
      if (!id) {
        return rfj({}, "Invalid Category Id", { status: 400 });
      }
      const db = getD1Db(c);
      const blogCategoryDAL = createBlogCategoryDAL(db);
      const result = await blogCategoryDAL.getById(id);
      return rsj(result ?? {});
    } catch (error) {
      return rfj(error as Error);
    }
  },
);

blogRouter.post(
  "/category",
  requirePermission("blog:category:read", "blog:list:read"),
  async (c) => {
    try {
      const userId = c.get("userId");
      if (!userId) {
        return rfj({}, "No Authorization No User", { status: 401 });
      }
      const dto = await c.req.json();
      const db = getD1Db(c);
      const blogCategoryDAL = createBlogCategoryDAL(db);
      const result = await blogCategoryDAL.create({ ...dto, userId });
      return rsj(result);
    } catch (error) {
      return rfj(error as Error);
    }
  },
);

blogRouter.put(
  "/category/:id",
  requirePermission("blog:category:read", "blog:list:read"),
  async (c) => {
    try {
      const userId = c.get("userId");
      if (!userId) {
        return rfj({}, "No Authorization No User", { status: 401 });
      }
      const id = c.req.param("id");
      const dto = await c.req.json();
      const db = getD1Db(c);
      const blogCategoryDAL = createBlogCategoryDAL(db);
      const result = await blogCategoryDAL.update({ ...dto, id, userId });
      return rsj(result);
    } catch (error) {
      return rfj(error as Error);
    }
  },
);

blogRouter.delete(
  "/category/:id",
  requirePermission("blog:category:read", "blog:list:read"),
  async (c) => {
    try {
      const id = c.req.param("id");
      if (!id) {
        return rfj({}, "Invalid Category Id", { status: 400 });
      }
      const db = getD1Db(c);
      const blogCategoryDAL = createBlogCategoryDAL(db);
      const result = await blogCategoryDAL.deleteByIds([id]);
      return rsj(result ?? {});
    } catch (error) {
      return rfj(error as Error);
    }
  },
);

blogRouter.delete(
  "/category",
  requirePermission("blog:category:read", "blog:list:read"),
  async (c) => {
    try {
      const dto = await c.req.json();
      const db = getD1Db(c);
      const blogCategoryDAL = createBlogCategoryDAL(db);
      const result = await blogCategoryDAL.deleteByIds(dto.ids ?? []);
      return rsj(result ?? {});
    } catch (error) {
      return rfj(error as Error);
    }
  },
);

blogRouter.get("/:id", requirePermission("blog:detail:read", "blog:list:read"), async (c) => {
  try {
    const id = c.req.param("id");
    if (!id) {
      return rfj({}, "Invalid Blog Id", { status: 400 });
    }
    const db = getD1Db(c);
    const blogDAL = createBlogDAL(db);
    const result = await blogDAL.getById(id);
    return rsj(result ?? {});
  } catch (error) {
    return rfj(error as Error);
  }
});

blogRouter.put("/:id", requirePermission("blog:detail:read", "blog:list:read"), async (c) => {
  try {
    const userId = c.get("userId");
    if (!userId) {
      return rfj({}, "No Authorization No User", { status: 401 });
    }
    const id = c.req.param("id");
    const dto = await c.req.json();
    const db = getD1Db(c);
    const blogDAL = createBlogDAL(db);
    const result = await blogDAL.update({
      ...dto,
      id,
      publishedAt: new Date(dto.publishedAt),
      userId,
    });
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

blogRouter.delete("/:id", requirePermission("blog:detail:read", "blog:list:read"), async (c) => {
  try {
    const id = c.req.param("id");
    if (!id) {
      return rfj({}, "Invalid Blog Id", { status: 400 });
    }
    const db = getD1Db(c);
    const blogDAL = createBlogDAL(db);
    const result = await blogDAL.deleteByIds([id]);
    return rsj(result ?? {});
  } catch (error) {
    return rfj(error as Error);
  }
});
