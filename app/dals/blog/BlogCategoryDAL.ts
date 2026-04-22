import { count, eq, inArray } from "drizzle-orm";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { blogCategories, blogs } from "db/schema";

export function createBlogCategoryDAL(db: DrizzleD1Database) {
  async function getCount() {
    const rows = await db.select({ count: count() }).from(blogCategories);
    return rows[0]?.count ?? 0;
  }

  async function create(data: any) {
    const created = await db.insert(blogCategories).values(data).returning();
    return created[0];
  }

  async function update(data: any) {
    const { id, ...values } = data;
    const updated = await db
      .update(blogCategories)
      .set(values)
      .where(eq(blogCategories.id, id))
      .returning();
    return updated[0];
  }

  async function deleteByIds(ids: string[]) {
    return await db.delete(blogCategories).where(inArray(blogCategories.id, ids)).returning();
  }

  async function getListByUserId(userId: string) {
    return await db.select().from(blogCategories).where(eq(blogCategories.userId, userId));
  }

  async function getById(id: string) {
    const rows = await db.select().from(blogCategories).where(eq(blogCategories.id, id)).limit(1);
    return rows[0] ?? null;
  }

  async function getAll() {
    return await db.select().from(blogCategories);
  }

  async function getPublicList() {
    return await db.select().from(blogCategories).where(eq(blogCategories.showOnClient, true));
  }

  async function getListWithBlog() {
    return await db
      .select()
      .from(blogCategories)
      .leftJoin(blogs, eq(blogs.categoryId, blogCategories.id));
  }

  return {
    getCount,
    create,
    update,
    deleteByIds,
    getListByUserId,
    getById,
    getAll,
    getPublicList,
    getListWithBlog,
  };
}

export type BlogCategoryDAL = ReturnType<typeof createBlogCategoryDAL>;
