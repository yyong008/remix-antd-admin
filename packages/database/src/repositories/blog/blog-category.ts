import { count, eq, inArray } from "drizzle-orm";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { blogCategories, blogs } from "../../schema";

export async function getCount(db: DrizzleD1Database) {
  const rows = await db.select({ count: count() }).from(blogCategories);
  return rows[0]?.count ?? 0;
}

export async function create(db: DrizzleD1Database, data: any) {
  const created = await db.insert(blogCategories).values(data).returning();
  return created[0];
}

export async function update(db: DrizzleD1Database, data: any) {
  const { id, ...values } = data;
  const updated = await db
    .update(blogCategories)
    .set(values)
    .where(eq(blogCategories.id, id))
    .returning();
  return updated[0];
}

export async function deleteByIds(db: DrizzleD1Database, ids: string[]) {
  return await db
    .delete(blogCategories)
    .where(inArray(blogCategories.id, ids))
    .returning();
}

export async function getListByUserId(db: DrizzleD1Database, userId: string) {
  return await db
    .select()
    .from(blogCategories)
    .where(eq(blogCategories.userId, userId));
}

export async function getById(db: DrizzleD1Database, id: string) {
  const rows = await db
    .select()
    .from(blogCategories)
    .where(eq(blogCategories.id, id))
    .limit(1);
  return rows[0] ?? null;
}

export async function getAll(db: DrizzleD1Database) {
  return await db.select().from(blogCategories);
}

export async function getPublicList(db: DrizzleD1Database) {
  return await db
    .select()
    .from(blogCategories)
    .where(eq(blogCategories.showOnClient, true));
}

export async function getListWithBlog(db: DrizzleD1Database) {
  return await db
    .select()
    .from(blogCategories)
    .leftJoin(blogs, eq(blogs.categoryId, blogCategories.id));
}
