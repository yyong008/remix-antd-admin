import { and, count, desc, eq, inArray } from "drizzle-orm";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { news, newsCategories } from "db/schema";

function toPublishedAtDate(v: unknown): Date {
  if (v == null) return new Date();
  if (v instanceof Date) return v;
  if (typeof v === "number" && Number.isFinite(v)) return new Date(v);
  if (typeof v === "string") {
    const n = Number(v);
    if (Number.isFinite(n)) return new Date(n);
    const d = new Date(v);
    if (!Number.isNaN(d.getTime())) return d;
  }
  if (
    typeof v === "object" &&
    v !== null &&
    "valueOf" in v &&
    typeof (v as { valueOf: () => unknown }).valueOf === "function"
  ) {
    const ms = (v as { valueOf: () => number }).valueOf();
    if (typeof ms === "number" && Number.isFinite(ms)) return new Date(ms);
  }
  return new Date();
}

export function createNewsDAL(db: DrizzleD1Database) {
  async function getCount() {
    const rows = await db.select({ c: count() }).from(news);
    return rows[0]?.c ?? 0;
  }

  async function getCountByCategory(categoryId: string) {
    const rows = await db.select({ c: count() }).from(news).where(eq(news.newsId, categoryId));
    return rows[0]?.c ?? 0;
  }

  async function getPage({ page, pageSize }: { page: number; pageSize: number }) {
    return await db
      .select()
      .from(news)
      .orderBy(desc(news.createdAt))
      .limit(pageSize)
      .offset((page - 1) * pageSize);
  }

  async function getPageByCategory({
    page,
    pageSize,
    categoryId,
  }: {
    page: number;
    pageSize: number;
    categoryId: string;
  }) {
    return await db
      .select()
      .from(news)
      .where(eq(news.newsId, categoryId))
      .orderBy(desc(news.createdAt))
      .limit(pageSize)
      .offset((page - 1) * pageSize);
  }

  async function getList({ page, pageSize }: { page: number; pageSize: number }) {
    return getPage({ page, pageSize });
  }

  async function getListWithCategoryId(categoryId: string) {
    return await db.select().from(news).where(eq(news.newsId, categoryId));
  }

  async function getNewsById(id: string) {
    const rows = await db.select().from(news).where(eq(news.id, id)).limit(1);
    return rows[0] ?? null;
  }

  async function getById(id: string) {
    return getNewsById(id);
  }

  async function getListByUserId(userId: string) {
    return await db.select().from(news).where(eq(news.userId, userId));
  }

  async function getAll() {
    return await db.select().from(news);
  }

  /** Public news list - only status=1 and category visible=true */
  async function getPublicList({ page, pageSize }: { page: number; pageSize: number }) {
    // Get visible category IDs
    const visibleCats = await db
      .select({ id: newsCategories.id })
      .from(newsCategories)
      .where(eq(newsCategories.visible, true));

    const categoryIds = visibleCats.map((c) => c.id);
    if (categoryIds.length === 0) return [];

    return await db
      .select()
      .from(news)
      .where(and(inArray(news.newsId, categoryIds), eq(news.status, 1)))
      .orderBy(desc(news.publishedAt))
      .limit(pageSize)
      .offset((page - 1) * pageSize);
  }

  /** Public news count */
  async function getPublicCount() {
    const visibleCats = await db
      .select({ id: newsCategories.id })
      .from(newsCategories)
      .where(eq(newsCategories.visible, true));

    const categoryIds = visibleCats.map((c) => c.id);
    if (categoryIds.length === 0) return 0;

    const rows = await db
      .select({ c: count() })
      .from(news)
      .where(and(inArray(news.newsId, categoryIds), eq(news.status, 1)));
    return rows[0]?.c ?? 0;
  }

  async function create(data: any) {
    const id = data.id ?? crypto.randomUUID();
    const publishedAt = toPublishedAtDate(data.publishedAt);
    const created = await db
      .insert(news)
      .values({
        id,
        title: data.title,
        content: data.content,
        author: data.author ?? null,
        source: data.source ?? null,
        viewCount: typeof data.viewCount === "number" ? data.viewCount : 0,
        publishedAt,
        newsId: data.newsId,
        userId: data.userId,
        status: typeof data.status === "number" ? data.status : 1,
      })
      .returning();
    return created[0];
  }

  async function update(data: any) {
    const { id } = data;
    if (!id) {
      throw new Error("Missing news id");
    }
    const publishedAt = toPublishedAtDate(data.publishedAt);
    const updated = await db
      .update(news)
      .set({
        title: data.title,
        content: data.content,
        author: data.author ?? null,
        source: data.source ?? null,
        publishedAt,
        newsId: data.newsId,
        userId: data.userId,
        status: data.status,
      })
      .where(eq(news.id, id))
      .returning();
    return updated[0];
  }

  async function toggleStatus(id: string) {
    const existing = await getNewsById(id);
    if (!existing) {
      throw new Error("News not found");
    }
    const newStatus = existing.status === 1 ? 0 : 1;
    const updated = await db
      .update(news)
      .set({ status: newStatus })
      .where(eq(news.id, id))
      .returning();
    return updated[0];
  }

  async function incrementViewCount(id: string) {
    const existing = await getNewsById(id);
    if (!existing) {
      throw new Error("News not found");
    }
    const updated = await db
      .update(news)
      .set({ viewCount: (existing.viewCount ?? 0) + 1 })
      .where(eq(news.id, id))
      .returning();
    return updated[0];
  }

  async function deleteByIds(ids: string[]) {
    if (!ids.length) return [];
    return await db.delete(news).where(inArray(news.id, ids)).returning();
  }

  return {
    getCount,
    getCountByCategory,
    getPage,
    getPageByCategory,
    getList,
    getListWithCategoryId,
    getNewsById,
    getById,
    getAll,
    getPublicList,
    getPublicCount,
    getListByUserId,
    create,
    update,
    toggleStatus,
    incrementViewCount,
    deleteByIds,
  };
}

export type NewsDAL = ReturnType<typeof createNewsDAL>;
