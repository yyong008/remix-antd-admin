import { and, count, eq, inArray } from "drizzle-orm";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { blogs, blogCategories } from "../../schema";

export async function getCount(db: DrizzleD1Database, data: any = {}) {
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

export async function getPage(db: DrizzleD1Database, { page, pageSize }: any) {
  return await db
    .select()
    .from(blogs)
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}

export async function create(db: DrizzleD1Database, data: any): Promise<any> {
  const created = await db.insert(blogs).values(data).returning();
  return created[0];
}

export async function update(db: DrizzleD1Database, data: any): Promise<any> {
  const { id, ...values } = data;
  const updated = await db
    .update(blogs)
    .set(values)
    .where(eq(blogs.id, id))
    .returning();
  return updated[0];
}

export async function deleteByIds(
  db: DrizzleD1Database,
  ids: string[],
): Promise<any> {
  return await db.delete(blogs).where(inArray(blogs.id, ids)).returning();
}

export async function getAll(db: DrizzleD1Database): Promise<any> {
  return await db.select().from(blogs);
}

export async function getListByCategoryId(
  db: DrizzleD1Database,
  categoryId: string,
): Promise<any> {
  return await db.select().from(blogs).where(eq(blogs.categoryId, categoryId));
}

export async function getAdminList(
  db: DrizzleD1Database,
  data: any,
): Promise<any> {
  const { categoryId, tagId, page, pageSize } = data;
  const conditions = [] as any[];
  if (tagId && tagId !== "0" && tagId !== 0)
    conditions.push(eq(blogs.tagId, tagId));
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

export async function getAdminCount(
  db: DrizzleD1Database,
  data: any,
): Promise<number> {
  const { categoryId, tagId } = data;
  const conditions = [] as any[];
  if (tagId && tagId !== "0" && tagId !== 0)
    conditions.push(eq(blogs.tagId, tagId));
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

export async function getPublicList(db: DrizzleD1Database): Promise<any> {
  const publicCategories = await db
    .select({ id: blogCategories.id })
    .from(blogCategories)
    .where(eq(blogCategories.showOnClient, true));
  const categoryIds = publicCategories.map((c) => c.id);
  if (categoryIds.length === 0) return [];
  return await db
    .select()
    .from(blogs)
    .where(
      and(inArray(blogs.categoryId, categoryIds), eq(blogs.isPublished, true)),
    );
}

export async function getById(db: DrizzleD1Database, id: string): Promise<any> {
  const rows = await db.select().from(blogs).where(eq(blogs.id, id)).limit(1);
  return rows[0] ?? null;
}
