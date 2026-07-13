import { count, eq, inArray } from "drizzle-orm";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { changeLogs } from "../../schema";

export async function getCount(db: DrizzleD1Database) {
  const rows = await db.select({ count: count() }).from(changeLogs);
  return rows[0]?.count ?? 0;
}

export async function getById(db: DrizzleD1Database, id: string) {
  const rows = await db
    .select()
    .from(changeLogs)
    .where(eq(changeLogs.id, id))
    .limit(1);
  return rows[0] ?? null;
}

export async function getList(
  db: DrizzleD1Database,
  { where, skip, take }: any,
) {
  let query: any = db.select().from(changeLogs);
  if (where?.userId !== undefined) {
    query = query.where(eq(changeLogs.userId, String(where.userId)));
  }
  if (typeof take === "number") query = query.limit(take);
  if (typeof skip === "number") query = query.offset(skip);
  return (await query) as any;
}

export async function create(db: DrizzleD1Database, data: any) {
  const created = await db.insert(changeLogs).values(data).returning();
  return created[0];
}

export async function update(db: DrizzleD1Database, data: any) {
  const { id, ...values } = data;
  const updated = await db
    .update(changeLogs)
    .set(values)
    .where(eq(changeLogs.id, String(id)))
    .returning();
  return updated[0];
}

export async function deleteByIds(db: DrizzleD1Database, ids: string[]) {
  return await db
    .delete(changeLogs)
    .where(inArray(changeLogs.id, ids))
    .returning();
}
