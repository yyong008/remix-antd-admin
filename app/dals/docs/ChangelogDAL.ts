import { count, eq, inArray } from "drizzle-orm";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { changeLogs } from "db/schema";

export function createChangeLogDAL(db: DrizzleD1Database) {
  async function getCount() {
    const rows = await db.select({ count: count() }).from(changeLogs);
    return rows[0]?.count ?? 0;
  }

  async function getById(id: string) {
    const rows = await db.select().from(changeLogs).where(eq(changeLogs.id, id)).limit(1);
    return rows[0] ?? null;
  }

  async function getList({ where, skip, take }: any) {
    let query: any = db.select().from(changeLogs);
    if (where?.userId !== undefined) {
      query = query.where(eq(changeLogs.userId, String(where.userId)));
    }
    if (typeof take === "number") query = query.limit(take);
    if (typeof skip === "number") query = query.offset(skip);
    return (await query) as any;
  }

  async function create(data: any) {
    const created = await db.insert(changeLogs).values(data).returning();
    return created[0];
  }

  async function update(data: any) {
    const { id, ...values } = data;
    const updated = await db
      .update(changeLogs)
      .set(values)
      .where(eq(changeLogs.id, String(id)))
      .returning();
    return updated[0];
  }

  async function deleteByIds(ids: string[]) {
    return await db.delete(changeLogs).where(inArray(changeLogs.id, ids)).returning();
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

export type ChangeLogDAL = ReturnType<typeof createChangeLogDAL>;
