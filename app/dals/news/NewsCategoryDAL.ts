import { and, count, eq, inArray, ne } from "drizzle-orm";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { newsCategories, user } from "db/schema";

export function createNewsCategoryDAL(db: DrizzleD1Database) {
  async function getCount() {
    const rows = await db.select({ count: count() }).from(newsCategories);
    return rows[0]?.count ?? 0;
  }

  async function getById(id: string) {
    const rows = await db.select().from(newsCategories).where(eq(newsCategories.id, id)).limit(1);
    return rows[0] ?? null;
  }

  async function getList(data: any) {
    return await db
      .select()
      .from(newsCategories)
      .limit(data.pageSize)
      .offset(data.pageSize * (data.page - 1));
  }

  async function getAll() {
    return await db.select().from(newsCategories);
  }

  /** Public category list - only visible categories */
  async function getPublicList() {
    return await db.select().from(newsCategories).where(eq(newsCategories.visible, true));
  }

  async function getListWithMore({ where, skip, take }: any) {
    let query = db.select().from(newsCategories);
    if (where?.userId !== undefined) {
      query = query.where(eq(newsCategories.userId, where.userId));
    }
    if (typeof take === "number") query = query.limit(take);
    if (typeof skip === "number") query = query.offset(skip);
    return await query;
  }

  async function getNewsCategoryListByUserId(userId: string) {
    return await db.select().from(newsCategories).where(eq(newsCategories.userId, userId));
  }

  async function getNewsCategoryListByNewsId(_newsId: number) {
    return await db.select().from(newsCategories);
  }

  async function getNewsCategoryListByNewsIds(_newsIds: number[]) {
    return await db.select().from(newsCategories);
  }

  async function create(data: {
    name: unknown;
    description?: unknown;
    visible?: unknown;
    userId: string;
  }) {
    const visible =
      data.visible === false || data.visible === 0 || data.visible === "0" ? false : true;
    const id = crypto.randomUUID();
    const name = String(data.name ?? "").trim();
    if (!name) {
      throw new Error("分类名称不能为空");
    }
    const description =
      data.description == null || data.description === ""
        ? null
        : String(data.description).trim() || null;
    const uid = String(data.userId).trim();
    if (!uid) {
      throw new Error("缺少用户上下文，请重新登录");
    }
    const userRow = await db.select({ id: user.id }).from(user).where(eq(user.id, uid)).limit(1);
    if (!userRow.length) {
      throw new Error(
        "USER_NOT_IN_DATABASE: 当前登录账号在 user 表中不存在，无法写入 news_category.user_id 外键。请执行本地种子或确认会话用户与数据库一致。",
      );
    }

    const nameTaken = await db
      .select({ id: newsCategories.id })
      .from(newsCategories)
      .where(eq(newsCategories.name, name))
      .limit(1);
    if (nameTaken.length) {
      throw new Error("该分类名称已存在");
    }

    const now = new Date();
    /** D1 上部分环境对 `INSERT … RETURNING` 不稳定，插入后单独查询 */
    await db.insert(newsCategories).values({
      id,
      name,
      description,
      userId: uid,
      visible,
      createdAt: now,
      updatedAt: now,
    });
    const created = await getById(id);
    if (!created) {
      throw new Error("分类已写入但读取失败，请刷新列表");
    }
    return created;
  }

  async function update(data: {
    id: string;
    name: unknown;
    description?: unknown;
    visible?: unknown;
    userId: string;
  }) {
    const visible =
      data.visible === false || data.visible === 0 || data.visible === "0" ? false : true;
    const name = String(data.name ?? "").trim();
    if (!name) {
      throw new Error("分类名称不能为空");
    }
    const description =
      data.description == null || data.description === ""
        ? null
        : String(data.description).trim() || null;
    const uid = String(data.userId).trim();
    if (!uid) {
      throw new Error("缺少用户上下文，请重新登录");
    }
    const userRow = await db.select({ id: user.id }).from(user).where(eq(user.id, uid)).limit(1);
    if (!userRow.length) {
      throw new Error(
        "USER_NOT_IN_DATABASE: 当前登录账号在 user 表中不存在，无法写入 news_category.user_id 外键。请执行本地种子或确认会话用户与数据库一致。",
      );
    }

    const nameTaken = await db
      .select({ id: newsCategories.id })
      .from(newsCategories)
      .where(and(eq(newsCategories.name, name), ne(newsCategories.id, data.id)))
      .limit(1);
    if (nameTaken.length) {
      throw new Error("该分类名称已存在");
    }

    await db
      .update(newsCategories)
      .set({
        name,
        description,
        userId: uid,
        visible,
        updatedAt: new Date(),
      })
      .where(eq(newsCategories.id, data.id));
    const updated = await getById(data.id);
    if (!updated) {
      throw new Error("更新后无法读取分类，请刷新重试");
    }
    return updated;
  }

  async function deleteByIds(ids: string[]) {
    if (!ids.length) return [];
    await db.delete(newsCategories).where(inArray(newsCategories.id, ids));
    return [];
  }

  return {
    getCount,
    getById,
    getList,
    getAll,
    getPublicList,
    getListWithMore,
    getNewsCategoryListByUserId,
    getNewsCategoryListByNewsId,
    getNewsCategoryListByNewsIds,
    create,
    update,
    deleteByIds,
  };
}

export type NewsCategoryDAL = ReturnType<typeof createNewsCategoryDAL>;
