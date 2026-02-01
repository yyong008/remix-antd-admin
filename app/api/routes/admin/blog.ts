import { Hono } from "hono";

import type { HonoEnv } from "../../types";
import { blogCategoryDAL, blogDAL, blogTagDAL } from "~/dals/blog";
import { getSearchParams, getSearchParamsPage, getSearchParamsPageSize } from "~/utils/server";
import { rfj, rsj } from "~/utils/server/response-json";

export const blogRouter = new Hono<HonoEnv>();

blogRouter.get("/", async (c) => {
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


blogRouter.post("/", async (c) => {
  try {
    const userId = c.get("userId");
    if (!userId) {
      return rfj({}, "No Authorization No User", { status: 401 });
    }
    const dto = await c.req.json();
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


blogRouter.delete("/", async (c) => {
  try {
    const dto = await c.req.json();
    const result = await blogDAL.deleteByIds(dto.ids ?? []);
    return rsj(result ?? {});
  } catch (error) {
    return rfj(error as Error);
  }
});

blogRouter.get("/tag", async (c) => {
  try {
    const userId = c.get("userId");
    if (!userId) {
      return rfj({}, "No Authorization No User", { status: 401 });
    }
    const total = await blogTagDAL.getCount();
    const list = await blogTagDAL.getByUserId(userId);
    return rsj({ total, list });
  } catch (error) {
    return rfj(error as Error);
  }
});

blogRouter.get("/tag/:id", async (c) => {
  try {
    const id = Number(c.req.param("id"));
    if (!id) {
      return rfj({}, "Invalid Tag Id", { status: 400 });
    }
    const result = await blogTagDAL.getBlogTagById(id);
    return rsj(result ?? {});
  } catch (error) {
    return rfj(error as Error);
  }
});

blogRouter.post("/tag", async (c) => {
  try {
    const userId = c.get("userId");
    if (!userId) {
      return rfj({}, "No Authorization No User", { status: 401 });
    }
    const dto = await c.req.json();
    const result = await blogTagDAL.create({ ...dto, userId });
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

blogRouter.put("/tag/:id", async (c) => {
  try {
    const userId = c.get("userId");
    if (!userId) {
      return rfj({}, "No Authorization No User", { status: 401 });
    }
    const id = Number(c.req.param("id"));
    const dto = await c.req.json();
    const result = await blogTagDAL.update({ ...dto, id, userId });
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

blogRouter.delete("/tag/:id", async (c) => {
  try {
    const id = Number(c.req.param("id"));
    if (!id) {
      return rfj({}, "Invalid Tag Id", { status: 400 });
    }
    const result = await blogTagDAL.deleteById(id);
    return rsj(result ?? {});
  } catch (error) {
    return rfj(error as Error);
  }
});

blogRouter.delete("/tag", async (c) => {
  try {
    const dto = await c.req.json();
    const result = await blogTagDAL.deleteBlogTagByIds(dto.ids ?? []);
    return rsj(result ?? {});
  } catch (error) {
    return rfj(error as Error);
  }
});

blogRouter.get("/category", async (c) => {
  try {
    const userId = c.get("userId");
    if (!userId) {
      return rfj({}, "No Authorization No User", { status: 401 });
    }
    const total = await blogCategoryDAL.getCount();
    const list = await blogCategoryDAL.getListByUserId(userId);
    return rsj({ total, list });
  } catch (error) {
    return rfj(error as Error);
  }
});

blogRouter.get("/category/:id", async (c) => {
  try {
    const id = Number(c.req.param("id"));
    if (!id) {
      return rfj({}, "Invalid Category Id", { status: 400 });
    }
    const result = await blogCategoryDAL.getById(id);
    return rsj(result ?? {});
  } catch (error) {
    return rfj(error as Error);
  }
});

blogRouter.post("/category", async (c) => {
  try {
    const userId = c.get("userId");
    if (!userId) {
      return rfj({}, "No Authorization No User", { status: 401 });
    }
    const dto = await c.req.json();
    const result = await blogCategoryDAL.create({ ...dto, userId });
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

blogRouter.put("/category/:id", async (c) => {
  try {
    const userId = c.get("userId");
    if (!userId) {
      return rfj({}, "No Authorization No User", { status: 401 });
    }
    const id = Number(c.req.param("id"));
    const dto = await c.req.json();
    const result = await blogCategoryDAL.update({ ...dto, id, userId });
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

blogRouter.delete("/category/:id", async (c) => {
  try {
    const id = Number(c.req.param("id"));
    if (!id) {
      return rfj({}, "Invalid Category Id", { status: 400 });
    }
    const result = await blogCategoryDAL.deleteByIds([id]);
    return rsj(result ?? {});
  } catch (error) {
    return rfj(error as Error);
  }
});

blogRouter.delete("/category", async (c) => {
  try {
    const dto = await c.req.json();
    const result = await blogCategoryDAL.deleteByIds(dto.ids ?? []);
    return rsj(result ?? {});
  } catch (error) {
    return rfj(error as Error);
  }
});

blogRouter.get("/:id", async (c) => {
  try {
    const id = Number(c.req.param("id"));
    if (!id) {
      return rfj({}, "Invalid Blog Id", { status: 400 });
    }
    const result = await blogDAL.getById(id);
    return rsj(result ?? {});
  } catch (error) {
    return rfj(error as Error);
  }
});

blogRouter.put("/:id", async (c) => {
  try {
    const userId = c.get("userId");
    if (!userId) {
      return rfj({}, "No Authorization No User", { status: 401 });
    }
    const id = Number(c.req.param("id"));
    const dto = await c.req.json();
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

blogRouter.delete("/:id", async (c) => {
  try {
    const id = Number(c.req.param("id"));
    if (!id) {
      return rfj({}, "Invalid Blog Id", { status: 400 });
    }
    const result = await blogDAL.deleteByIds([id]);
    return rsj(result ?? {});
  } catch (error) {
    return rfj(error as Error);
  }
});
