import { and, asc, count, desc, eq, inArray, like } from "drizzle-orm";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { operates } from "db/schema";

export function createOperateDAL(db: DrizzleD1Database) {
  async function getById(id: number) {
    const rows = await db.select().from(operates).where(eq(operates.id, id)).limit(1);
    return rows[0] ?? null;
  }

  async function getOperates(data: { where: any; skip: number; take: number; orderBy: any }) {
    const conditions = [] as any[];
    if (data.where?.userId !== undefined) {
      conditions.push(eq(operates.userId, data.where.userId));
    }
    if (data.where?.username?.contains) {
      conditions.push(like(operates.username, `%${data.where.username.contains}%`));
    }
    let query = db.select().from(operates);
    if (conditions.length) query = query.where(and(...conditions));
    if (data.orderBy?.id === "desc") query = query.orderBy(desc(operates.id));
    if (data.orderBy?.id === "asc") query = query.orderBy(asc(operates.id));
    return await query.limit(data.take).offset(data.skip);
  }

  async function getOperatesCount(data: { where: any }) {
    const conditions = [] as any[];
    if (data.where?.userId !== undefined) {
      conditions.push(eq(operates.userId, data.where.userId));
    }
    if (data.where?.username?.contains) {
      conditions.push(like(operates.username, `%${data.where.username.contains}%`));
    }
    let query = db.select({ count: count() }).from(operates);
    if (conditions.length) query = query.where(and(...conditions));
    const rows = await query;
    return rows[0]?.count ?? 0;
  }

  async function createOperate(data: any) {
    const created = await db.insert(operates).values(data).returning();
    return created[0];
  }

  async function deleteByIdsOperate(ids: number[]) {
    const deleted = await db
      .delete(operates)
      .where(inArray(operates.id, ids))
      .returning({ id: operates.id });
    return { count: deleted.length };
  }

  return {
    getById,
    getOperates,
    getOperatesCount,
    createOperate,
    deleteByIdsOperate,
  };
}

export type OperateDAL = ReturnType<typeof createOperateDAL>;
