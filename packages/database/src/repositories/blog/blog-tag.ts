import { count, eq, inArray } from "drizzle-orm";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { blogTags } from "../../schema";

export async function getCount(db: DrizzleD1Database) {
  const rows = await db.select({ count: count() }).from(blogTags);
  return rows[0]?.count ?? 0;
}

export async function getList(db: DrizzleD1Database) {
  return await db.select().from(blogTags);
}

export async function getListByUserId(db: DrizzleD1Database, userId: string) {
  return await db.select().from(blogTags).where(eq(blogTags.userId, userId));
}

export async function getById(db: DrizzleD1Database, id: string) {
  const rows = await db.select().from(blogTags).where(eq(blogTags.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function getBlogTagById(db: DrizzleD1Database, id: string) {
  return getById(db, id);
}

export async function create(db: DrizzleD1Database, data: any) {
  const created = await db.insert(blogTags).values(data).returning();
  return created[0];
}

export async function update(db: DrizzleD1Database, data: any) {
  const { id, ...values } = data;
  const updated = await db.update(blogTags).set(values).where(eq(blogTags.id, id)).returning();
  return updated[0];
}

export async function deleteById(db: DrizzleD1Database, id: string) {
  const deleted = await db.delete(blogTags).where(eq(blogTags.id, id)).returning();
  return deleted[0] ?? null;
}

export async function deleteBlogTagByIds(db: DrizzleD1Database, ids: string[]) {
  return await db.delete(blogTags).where(inArray(blogTags.id, ids)).returning();
}
