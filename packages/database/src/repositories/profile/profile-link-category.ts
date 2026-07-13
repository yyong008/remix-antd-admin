import { asc, count, desc, eq, inArray } from "drizzle-orm";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { linkCategories } from "../../schema";

function countResult(v: unknown): number {
  if (v == null) return 0;
  if (typeof v === "bigint") return Number(v);
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

export async function getCount(db: DrizzleD1Database) {
  const rows = await db.select({ count: count() }).from(linkCategories);
  return countResult(rows[0]?.count);
}

export async function getCountByUserId(db: DrizzleD1Database, userId: string) {
  const rows = await db
    .select({ count: count() })
    .from(linkCategories)
    .where(eq(linkCategories.userId, userId));
  return countResult(rows[0]?.count);
}

export async function getById(db: DrizzleD1Database, id: string) {
  const rows = await db
    .select()
    .from(linkCategories)
    .where(eq(linkCategories.id, id))
    .limit(1);
  return rows[0] ?? null;
}

export async function getList(
  db: DrizzleD1Database,
  { where, skip, take, orderBy }: any,
) {
  let query: any = db.select().from(linkCategories);
  if (where?.userId !== undefined) {
    query = query.where(eq(linkCategories.userId, where.userId));
  }
  if (orderBy?.id === "desc") query = query.orderBy(desc(linkCategories.id));
  if (orderBy?.id === "asc") query = query.orderBy(asc(linkCategories.id));
  if (typeof take === "number") query = query.limit(take);
  if (typeof skip === "number") query = query.offset(skip);
  return (await query) as any;
}

export async function create(db: DrizzleD1Database, data: any) {
  const created = await db.insert(linkCategories).values(data).returning();
  return created[0];
}

export async function update(db: DrizzleD1Database, { id, ...data }: any) {
  const updated = await db
    .update(linkCategories)
    .set(data)
    .where(eq(linkCategories.id, id))
    .returning();
  return updated[0];
}

export async function deleteByIds(db: DrizzleD1Database, ids: string[]) {
  return await db
    .delete(linkCategories)
    .where(inArray(linkCategories.id, ids))
    .returning();
}
