import { count, eq, inArray } from "drizzle-orm";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { blogTags } from "db/schema";

export function createBlogTagDAL(db: DrizzleD1Database) {
  async function getCount() {
    const rows = await db.select({ count: count() }).from(blogTags);
    return rows[0]?.count ?? 0;
  }

  async function getList() {
    return await db.select().from(blogTags);
  }

  async function getListByUserId(userId: string) {
    return await db.select().from(blogTags).where(eq(blogTags.userId, userId));
  }

  async function getById(id: string) {
    const rows = await db.select().from(blogTags).where(eq(blogTags.id, id)).limit(1);
    return rows[0] ?? null;
  }

  async function getBlogTagById(id: string) {
    return getById(id);
  }

  async function create(data: any) {
    const created = await db.insert(blogTags).values(data).returning();
    return created[0];
  }

  async function update(data: any) {
    const { id, ...values } = data;
    const updated = await db.update(blogTags).set(values).where(eq(blogTags.id, id)).returning();
    return updated[0];
  }

  async function deleteById(id: string) {
    const deleted = await db.delete(blogTags).where(eq(blogTags.id, id)).returning();
    return deleted[0] ?? null;
  }

  async function deleteBlogTagByIds(ids: string[]) {
    return await db.delete(blogTags).where(inArray(blogTags.id, ids)).returning();
  }

  return {
    getCount,
    getList,
    getListByUserId,
    getById,
    getBlogTagById,
    create,
    update,
    deleteById,
    deleteBlogTagByIds,
  };
}

export type BlogTagDAL = ReturnType<typeof createBlogTagDAL>;
