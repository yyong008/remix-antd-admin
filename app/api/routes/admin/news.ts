import { Hono } from "hono";

import type { HonoEnv } from "../../types";
import { requirePermission } from "~/api/middleware/rbac";
import { createNewsCategoryDAL } from "~/dals/news/NewsCategoryDAL";
import { createNewsDAL } from "~/dals/news/NewsDAL";
import { getSearchParams, getSearchParamsPage, getSearchParamsPageSize } from "~/utils/server";
import { rfj, rsj } from "~/utils/server/response-json";
import { errorTextChain, friendlyDbMessage } from "~/utils/server/db-error";
import { getD1Db } from "~/api/helpers/d1";

export const newsRouter = new Hono<HonoEnv>();

newsRouter.get("/", requirePermission("news:list:read", "news:detail:read"), async (c) => {
  try {
    const db = getD1Db(c);
    const newsDAL = createNewsDAL(db);
    const req = c.req.raw;
    const page = getSearchParamsPage(req);
    const pageSize = getSearchParamsPageSize(req);
    const categoryId = getSearchParams(req, "category")?.trim() ?? "";
    const total = categoryId
      ? await newsDAL.getCountByCategory(categoryId)
      : await newsDAL.getCount();
    const list = categoryId
      ? await newsDAL.getPageByCategory({ page, pageSize, categoryId })
      : await newsDAL.getPage({ page, pageSize });
    return rsj({ total, list });
  } catch (error) {
    return rfj(error as Error);
  }
});

newsRouter.post("/", requirePermission("news:list:read", "news:detail:read"), async (c) => {
  try {
    const db = getD1Db(c);
    const newsDAL = createNewsDAL(db);
    const userId = c.get("userId");
    if (!userId) {
      return rfj({}, "No Authorization No User", { status: 401 });
    }
    const dto = await c.req.json();
    const result = await newsDAL.create({ ...dto, userId });
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

newsRouter.put("/", requirePermission("news:list:read", "news:detail:read"), async (c) => {
  try {
    const db = getD1Db(c);
    const newsDAL = createNewsDAL(db);
    const userId = c.get("userId");
    if (!userId) {
      return rfj({}, "No Authorization No User", { status: 401 });
    }
    const dto = await c.req.json();
    const result = await newsDAL.update({ ...dto, userId });
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

newsRouter.delete("/", requirePermission("news:list:read", "news:detail:read"), async (c) => {
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

newsRouter.put(
  "/toggle-status",
  requirePermission("news:list:read", "news:detail:read"),
  async (c) => {
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
  },
);

newsRouter.get(
  "/category",
  requirePermission("news:category:read", "news:list:read"),
  async (c) => {
    try {
      const db = getD1Db(c);
      const newsCategoryDAL = createNewsCategoryDAL(db);
      const newsDAL = createNewsDAL(db);
      const req = c.req.raw;
      const page = getSearchParamsPage(req);
      const pageSize = getSearchParamsPageSize(req);
      const total = await newsCategoryDAL.getCount();
      const list = await newsCategoryDAL.getList({ page, pageSize });

      const categoriesWithCount = await Promise.all(
        list.map(async (cat) => {
          const countResult = await newsDAL.getCountByCategory(cat.id);
          return { ...cat, newsCount: countResult };
        }),
      );

      return rsj({ total, list: categoriesWithCount });
    } catch (error) {
      return rfj(error as Error);
    }
  },
);

newsRouter.post(
  "/category",
  requirePermission("news:category:read", "news:list:read"),
  async (c) => {
    try {
      const db = getD1Db(c);
      const newsCategoryDAL = createNewsCategoryDAL(db);
      const userId = c.get("userId");
      if (!userId) {
        return rfj({}, "No Authorization No User", { status: 401 });
      }
      const body = (await c.req.json()) as Record<string, unknown>;
      /** 禁止 ...body 整包写入，避免多余字段干扰 Drizzle / 唯一约束 */
      const result = await newsCategoryDAL.create({
        name: body.name,
        description: body.description,
        visible: body.visible,
        userId,
      });
      return rsj(result);
    } catch (error) {
      const msg = errorTextChain(error);
      if (msg.includes("USER_NOT_IN_DATABASE")) {
        return rfj(
          {},
          "当前账号在数据库中没有对应用户记录，无法写入分类。请先注册/登录以写入 user 表，或本地执行 pnpm db:setup:local。",
          { status: 400 },
        );
      }
      if (/FOREIGN KEY|foreign key constraint/i.test(msg)) {
        return rfj({}, "外键校验失败：登录用户需在 user 表中存在。", { status: 400 });
      }
      if (
        /no such column.*visible|no such column: visible|no column named.*visible|has no column named.*visible/i.test(
          msg,
        )
      ) {
        return rfj({}, "数据库未包含 news_category.visible 列，请执行 pnpm db:migrate:local。", {
          status: 500,
        });
      }
      if (/UNIQUE|constraint failed.*name/i.test(msg)) {
        return rfj({}, "该分类名称已存在", { status: 400 });
      }
      return rfj({}, friendlyDbMessage(error));
    }
  },
);

newsRouter.put(
  "/category",
  requirePermission("news:category:read", "news:list:read"),
  async (c) => {
    try {
      const db = getD1Db(c);
      const newsCategoryDAL = createNewsCategoryDAL(db);
      const userId = c.get("userId");
      if (!userId) {
        return rfj({}, "No Authorization No User", { status: 401 });
      }
      const body = (await c.req.json()) as Record<string, unknown>;
      const id = body.id != null ? String(body.id).trim() : "";
      if (!id) {
        return rfj({}, "缺少分类 ID", { status: 400 });
      }
      const result = await newsCategoryDAL.update({
        id,
        name: body.name,
        description: body.description,
        visible: body.visible,
        userId,
      });
      return rsj(result);
    } catch (error) {
      const msg = errorTextChain(error);
      if (msg.includes("USER_NOT_IN_DATABASE")) {
        return rfj(
          {},
          "当前账号在数据库中没有对应用户记录，无法更新分类。请先注册/登录以写入 user 表，或本地执行 pnpm db:setup:local。",
          { status: 400 },
        );
      }
      if (/FOREIGN KEY|foreign key constraint/i.test(msg)) {
        return rfj({}, "外键校验失败：登录用户需在 user 表中存在。", { status: 400 });
      }
      if (
        /no such column.*visible|no such column: visible|no column named.*visible|has no column named.*visible/i.test(
          msg,
        )
      ) {
        return rfj({}, "数据库未包含 news_category.visible 列，请执行 pnpm db:migrate:local。", {
          status: 500,
        });
      }
      if (/UNIQUE|constraint failed.*name/i.test(msg)) {
        return rfj({}, "该分类名称已存在", { status: 400 });
      }
      return rfj({}, friendlyDbMessage(error));
    }
  },
);

newsRouter.delete(
  "/category",
  requirePermission("news:category:read", "news:list:read"),
  async (c) => {
    try {
      const db = getD1Db(c);
      const newsCategoryDAL = createNewsCategoryDAL(db);
      const dto = await c.req.json();
      const result = await newsCategoryDAL.deleteByIds(dto.ids ?? []);
      return rsj(result ?? {});
    } catch (error) {
      return rfj({}, friendlyDbMessage(error));
    }
  },
);

newsRouter.get("/:id", requirePermission("news:detail:read", "news:list:read"), async (c) => {
  try {
    const db = getD1Db(c);
    const newsDAL = createNewsDAL(db);
    const id = c.req.param("id")?.trim() ?? "";
    if (!id) {
      return rfj({}, "Invalid News Id", { status: 400 });
    }
    const result = await newsDAL.getNewsById(id);
    return rsj(result ?? {});
  } catch (error) {
    return rfj(error as Error);
  }
});

newsRouter.put("/:id/view", async (c) => {
  try {
    const db = getD1Db(c);
    const newsDAL = createNewsDAL(db);
    const id = c.req.param("id")?.trim() ?? "";
    if (!id) {
      return rfj({}, "Invalid News Id", { status: 400 });
    }
    const result = await newsDAL.incrementViewCount(id);
    return rsj(result ?? {});
  } catch (error) {
    return rfj(error as Error);
  }
});
