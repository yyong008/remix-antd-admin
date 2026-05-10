import { count, eq, inArray } from "drizzle-orm";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { feedbacks } from "../../schema";

export function createFeedbackDAL(db: DrizzleD1Database) {
  async function getCount() {
    const rows = await db.select({ count: count() }).from(feedbacks);
    return rows[0]?.count ?? 0;
  }

  async function getById(id: string) {
    const rows = await db.select().from(feedbacks).where(eq(feedbacks.id, id)).limit(1);
    return rows[0] ?? null;
  }

  async function getList({ where, skip, take }: any) {
    let query: any = db.select().from(feedbacks);
    if (where?.userId !== undefined) {
      query = query.where(eq(feedbacks.userId, String(where.userId)));
    }
    if (typeof take === "number") query = query.limit(take);
    if (typeof skip === "number") query = query.offset(skip);
    return (await query) as any;
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
      .where(eq(feedbacks.id, String(id)))
      .returning();
    return updated[0];
  }

  async function deleteByIds(ids: string[]) {
    return await db.delete(feedbacks).where(inArray(feedbacks.id, ids)).returning();
  }

  return {
    getCount,
    getById,
    getList,
    create,
    update,
    deleteByIds,
  };
}

export type FeedbackDAL = ReturnType<typeof createFeedbackDAL>;