import { and, count, eq, inArray } from "drizzle-orm";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { blogs } from "db/schema";

export function createBlogDAL(db: DrizzleD1Database) {
  async function getCount(data: any = {}) {
    const { userId, categoryId, tagId } = data;
    const conditions = [] as any[];
    if (userId !== undefined) conditions.push(eq(blogs.userId, userId));
    if (tagId) conditions.push(eq(blogs.tagId, tagId));
    if (categoryId) conditions.push(eq(blogs.categoryId, categoryId));

    if (conditions.length) {
      const rows = await db
        .select({ count: count() })
        .from(blogs)
        .where(and(...conditions));
      return rows[0]?.count ?? 0;
    }
    const rows = await db.select({ count: count() }).from(blogs);
    return rows[0]?.count ?? 0;
  }

  async function getPage({ page, pageSize }: any) {
    return await db
      .select()
      .from(blogs)
      .limit(pageSize)
      .offset((page - 1) * pageSize);
  }

  async function create(data: any): Promise<any> {
    const created = await db.insert(blogs).values(data).returning();
    return created[0];
  }

  async function update(data: any): Promise<any> {
    const { id, ...values } = data;
    const updated = await db.update(blogs).set(values).where(eq(blogs.id, id)).returning();
    return updated[0];
  }

  async function deleteByIds(ids: string[]): Promise<any> {
    return await db.delete(blogs).where(inArray(blogs.id, ids)).returning();
  }

  async function getAll(): Promise<any> {
    return await db.select().from(blogs);
  }

  async function getListByCategoryId(categoryId: string): Promise<any> {
    return await db.select().from(blogs).where(eq(blogs.categoryId, categoryId));
  }

  /** Admin blog list - no userId filter, show all */
  async function getAdminList(data: any): Promise<any> {
    const { categoryId, tagId, page, pageSize } = data;
    const conditions = [] as any[];
    if (tagId && tagId !== "0" && tagId !== 0) conditions.push(eq(blogs.tagId, tagId));
    if (categoryId && categoryId !== "0" && categoryId !== 0)
      conditions.push(eq(blogs.categoryId, categoryId));

    let query = db.select().from(blogs);
    if (conditions.length) {
      return await query
        .where(and(...conditions))
        .limit(pageSize)
        .offset((page - 1) * pageSize);
    }
    return await query.limit(pageSize).offset((page - 1) * pageSize);
  }

  /** Admin blog count - no userId filter */
  async function getAdminCount(data: any): Promise<number> {
    const { categoryId, tagId } = data;
    const conditions = [] as any[];
    if (tagId && tagId !== "0" && tagId !== 0) conditions.push(eq(blogs.tagId, tagId));
    if (categoryId && categoryId !== "0" && categoryId !== 0)
      conditions.push(eq(blogs.categoryId, categoryId));

    if (conditions.length) {
      const rows = await db
        .select({ count: count() })
        .from(blogs)
        .where(and(...conditions));
      return rows[0]?.count ?? 0;
    }
    const rows = await db.select({ count: count() }).from(blogs);
    return rows[0]?.count ?? 0;
  }

  async function getPublicList(): Promise<any> {
    return await db.select().from(blogs);
  }

  async function getById(id: string): Promise<any> {
    const rows = await db.select().from(blogs).where(eq(blogs.id, id)).limit(1);
    return rows[0] ?? null;
  }

  return {
    getCount,
    getPage,
    create,
    update,
    deleteByIds,
    getAll,
    getListByCategoryId,
    getAdminList,
    getAdminCount,
    getPublicList,
    getById,
  };
}

export type BlogDAL = ReturnType<typeof createBlogDAL>;
