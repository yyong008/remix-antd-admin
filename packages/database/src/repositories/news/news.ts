import { and, count, desc, eq, inArray } from "drizzle-orm";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { news, newsCategories } from "../../schema";

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
    typeof (
      v as {
        valueOf: () => unknown;
      }
    ).valueOf === "function"
  ) {
    const ms = (
      v as {
        valueOf: () => number;
      }
    ).valueOf();
    if (typeof ms === "number" && Number.isFinite(ms)) return new Date(ms);
  }
  return new Date();
}

export async function getCount(db: DrizzleD1Database) {
  const rows = await db.select({ c: count() }).from(news);
  return rows[0]?.c ?? 0;
}

export async function getCountByCategory(db: DrizzleD1Database, categoryId: string) {
  const rows = await db.select({ c: count() }).from(news).where(eq(news.newsId, categoryId));
  return rows[0]?.c ?? 0;
}

export async function getPage(
  db: DrizzleD1Database,
  {
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  },
) {
  return await db
    .select()
    .from(news)
    .orderBy(desc(news.createdAt))
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}

export async function getPageByCategory(
  db: DrizzleD1Database,
  {
    page,
    pageSize,
    categoryId,
  }: {
    page: number;
    pageSize: number;
    categoryId: string;
  },
) {
  return await db
    .select()
    .from(news)
    .where(eq(news.newsId, categoryId))
    .orderBy(desc(news.createdAt))
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}

export async function getList(
  db: DrizzleD1Database,
  {
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  },
) {
  return getPage(db, { page, pageSize });
}

export async function getListWithCategoryId(db: DrizzleD1Database, categoryId: string) {
  return await db.select().from(news).where(eq(news.newsId, categoryId));
}

export async function getNewsById(db: DrizzleD1Database, id: string) {
  const rows = await db.select().from(news).where(eq(news.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function getById(db: DrizzleD1Database, id: string) {
  return getNewsById(db, id);
}

export async function getListByUserId(db: DrizzleD1Database, userId: string) {
  return await db.select().from(news).where(eq(news.userId, userId));
}

export async function getAll(db: DrizzleD1Database) {
  return await db.select().from(news);
}

export async function getPublicList(
  db: DrizzleD1Database,
  {
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  },
) {
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

export async function getPublicCount(db: DrizzleD1Database) {
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

export async function create(db: DrizzleD1Database, data: any) {
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

export async function update(db: DrizzleD1Database, data: any) {
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

export async function toggleStatus(db: DrizzleD1Database, id: string) {
  const existing = await getNewsById(db, id);
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

export async function incrementViewCount(db: DrizzleD1Database, id: string) {
  const existing = await getNewsById(db, id);
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

export async function deleteByIds(db: DrizzleD1Database, ids: string[]) {
  if (!ids.length) return [];
  return await db.delete(news).where(inArray(news.id, ids)).returning();
}
