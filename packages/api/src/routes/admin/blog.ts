import * as blog from "@workspace/database/repositories/blog/blog";
import * as blogCategory from "@workspace/database/repositories/blog/blog-category";
import * as blogTag from "@workspace/database/repositories/blog/blog-tag";
import { Hono } from "hono";

import type { HonoEnv } from "../../types";
import { requirePermission } from "../../middleware/rbac";
import { getD1Db } from "../../helpers/d1";
import { getSearchParams, getSearchParamsPage, getSearchParamsPageSize } from "../../utils/server";
import { rfj, rsj } from "../../utils/server/response-json";

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
    const categoryId = getSearchParams(req, "categoryId");
    const tagId = getSearchParams(req, "tagId");
    const db = getD1Db(c);
    const total = await blog.getAdminCount(db, {
      categoryId: categoryId || undefined,
      tagId: tagId || undefined,
    });
    const list = await blog.getAdminList(db, {
      page,
      pageSize,
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
    const result = await blog.create(db, {
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
    const result = await blog.deleteByIds(db, dto.ids ?? []);
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
    const total = await blogTag.getCount(db);
    const list = await blogTag.getListByUserId(db, userId);
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
    const result = await blogTag.getBlogTagById(db, id);
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
    const result = await blogTag.create(db, { ...dto, userId });
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
    const result = await blogTag.update(db, { ...dto, id, userId });
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
    const result = await blogTag.deleteById(db, id);
    return rsj(result ?? {});
  } catch (error) {
    return rfj(error as Error);
  }
});

blogRouter.delete("/tag", requirePermission("blog:tag:read", "blog:list:read"), async (c) => {
  try {
    const dto = await c.req.json();
    const db = getD1Db(c);
    const result = await blogTag.deleteBlogTagByIds(db, dto.ids ?? []);
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
      const total = await blogCategory.getCount(db);
      const list = await blogCategory.getListByUserId(db, userId);
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
      const result = await blogCategory.getById(db, id);
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
      const result = await blogCategory.create(db, { ...dto, userId });
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
      const result = await blogCategory.update(db, { ...dto, id, userId });
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
      const result = await blogCategory.deleteByIds(db, [id]);
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
      const result = await blogCategory.deleteByIds(db, dto.ids ?? []);
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
    const result = await blog.getById(db, id);
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
    const updateData: any = { ...dto, id };
    if (dto.publishedAt) updateData.publishedAt = new Date(dto.publishedAt);
    updateData.userId = userId;
    const result = await blog.update(db, updateData);
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
    const result = await blog.deleteByIds(db, [id]);
    return rsj(result ?? {});
  } catch (error) {
    return rfj(error as Error);
  }
});
