import { count, eq, inArray } from "drizzle-orm";
import { db } from "@/libs/neon";
import { feedbacks } from "db/schema";

async function getCount() {
  const rows = await db.select({ count: count() }).from(feedbacks);
  return rows[0]?.count ?? 0;
}

async function getListById(id: number) {
  return await db.select().from(feedbacks).where(eq(feedbacks.id, id));
}

async function getList({ where, skip, take }: any) {
  let query = db.select().from(feedbacks);
  if (where?.userId !== undefined) {
    query = query.where(eq(feedbacks.userId, where.userId));
  }
  if (typeof take === "number") query = query.limit(take);
  if (typeof skip === "number") query = query.offset(skip);
  return await query;
}

async function create(data: any) {
  const created = await db.insert(feedbacks).values(data).returning();
  return created[0];
}

async function update(data: any) {
  const { id, ...values } = data;
  const updated = await db
    .update(feedbacks)
    .set(values)
    .where(eq(feedbacks.id, id))
    .returning();
  return updated[0];
}

async function deleteByIds(ids: number[]) {
  return await db.delete(feedbacks).where(inArray(feedbacks.id, ids)).returning();
}

export const feedbackDAL = {
  getCount,
  getListById,
  getList,
  create,
  update,
  deleteByIds,
};
