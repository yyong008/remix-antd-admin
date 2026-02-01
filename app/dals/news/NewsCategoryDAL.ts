import { count, eq, inArray } from "drizzle-orm";
import { db } from "@/libs/neon";
import { newsCategories } from "db/schema";

async function getCount() {
  const rows = await db.select({ count: count() }).from(newsCategories);
  return rows[0]?.count ?? 0;
}

async function getById(id: number) {
  const rows = await db
    .select()
    .from(newsCategories)
    .where(eq(newsCategories.id, id))
    .limit(1);
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

async function getListWithMore({ where, skip, take }: any) {
  let query = db.select().from(newsCategories);
  if (where?.userId !== undefined) {
    query = query.where(eq(newsCategories.userId, where.userId));
  }
  if (typeof take === "number") query = query.limit(take);
  if (typeof skip === "number") query = query.offset(skip);
  return await query;
}

async function getNewsCategoryListByUserId(userId: number) {
  return await db
    .select()
    .from(newsCategories)
    .where(eq(newsCategories.userId, userId));
}

async function getNewsCategoryListByNewsId(_newsId: number) {
  return await db.select().from(newsCategories);
}

async function getNewsCategoryListByNewsIds(_newsIds: number[]) {
  return await db.select().from(newsCategories);
}

async function create(data: any) {
  const created = await db
    .insert(newsCategories)
    .values({
      name: data.name,
      description: data.description,
      userId: data.userId,
    })
    .returning();
  return created[0];
}

async function update(data: any) {
  const updated = await db
    .update(newsCategories)
    .set({
      name: data.name,
      description: data.description,
      userId: data.userId,
    })
    .where(eq(newsCategories.id, data.id))
    .returning();
  return updated[0];
}

async function deleteByIds(ids: number[]) {
  return await db
    .delete(newsCategories)
    .where(inArray(newsCategories.id, ids))
    .returning();
}

export const newsCategoryDAL = {
  getCount,
  getById,
  getList,
  getAll,
  getListWithMore,
  getNewsCategoryListByUserId,
  getNewsCategoryListByNewsId,
  getNewsCategoryListByNewsIds,
  create,
  update,
  deleteByIds,
};
