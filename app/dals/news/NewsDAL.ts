import { count, eq, inArray } from "drizzle-orm";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { news } from "db/schema";

export function createNewsDAL(db: DrizzleD1Database) {
  async function getCount() {
    const rows = await db.select({ count: count() }).from(news);
    return rows[0]?.count ?? 0;
  }

  async function getList({ page, pageSize }: { page: number; pageSize: number }) {
    return await db
      .select()
      .from(news)
      .limit(pageSize)
      .offset((page - 1) * pageSize);
  }

  async function getListWithCategoryId(categoryId: number) {
    return await db.select().from(news).where(eq(news.newsId, categoryId));
  }

  async function getById(id: number) {
    const rows = await db.select().from(news).where(eq(news.id, id)).limit(1);
    return rows[0] ?? null;
  }

  async function getAll() {
    return await db.select().from(news);
  }

  async function getListByUserId(userId: string) {
    return await db.select().from(news).where(eq(news.userId, userId));
  }

  async function create(data: any) {
    const created = await db.insert(news).values(data).returning();
    return created[0];
  }

  async function update(data: any) {
    const { id, ...values } = data;
    const updated = await db.update(news).set(values).where(eq(news.id, id)).returning();
    return updated[0];
  }

  async function deleteByIds(ids: number[]) {
    return await db.delete(news).where(inArray(news.id, ids)).returning();
  }

  return {
    getCount,
    getList,
    getListWithCategoryId,
    getById,
    getAll,
    getListByUserId,
    create,
    update,
    deleteByIds,
  };
}

export type NewsDAL = ReturnType<typeof createNewsDAL>;
