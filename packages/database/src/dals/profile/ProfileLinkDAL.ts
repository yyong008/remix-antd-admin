import { and, count, desc, eq, inArray } from "drizzle-orm";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { links } from "../../schema";

const linkRowBase = {
  id: links.id,
  name: links.name,
  url: links.url,
  description: links.description,
  categoryId: links.categoryId,
  userId: links.userId,
} as const;

const linkRowFull = {
  ...linkRowBase,
  createdAt: links.createdAt,
  updatedAt: links.updatedAt,
} as const;

function errorTextChain(err: unknown): string {
  const parts: string[] = [];
  let cur: unknown = err;
  for (let i = 0; i < 6 && cur; i++) {
    if (cur instanceof Error) {
      parts.push(cur.message);
      cur = cur.cause;
    } else {
      parts.push(String(cur));
      break;
    }
  }
  return parts.join("\n");
}

function isMissingProfileLinkTimestampColumnsError(err: unknown): boolean {
  const t = errorTextChain(err);
  if (/no such column/i.test(t)) return true;
  if (/Failed query/i.test(t) && /\bcreated_at\b|\bupdated_at\b/i.test(t)) return true;
  return false;
}

function countResult(v: unknown): number {
  if (v == null) return 0;
  if (typeof v === "bigint") return Number(v);
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

export function createProfileLinkDAL(db: DrizzleD1Database) {
  async function getCount(userId: string, categoryId?: string) {
    const cond = categoryId
      ? and(eq(links.userId, userId), eq(links.categoryId, categoryId))
      : eq(links.userId, userId);
    const rows = await db.select({ count: count() }).from(links).where(cond);
    return countResult(rows[0]?.count);
  }

  async function getListByUserId(userId: string) {
    try {
      return await db.select(linkRowFull).from(links).where(eq(links.userId, userId));
    } catch (err) {
      if (!isMissingProfileLinkTimestampColumnsError(err)) throw err;
      return await db.select(linkRowBase).from(links).where(eq(links.userId, userId));
    }
  }

  async function getById(id: string) {
    try {
      const rows = await db.select(linkRowFull).from(links).where(eq(links.id, id)).limit(1);
      return rows[0] ?? null;
    } catch (err) {
      if (!isMissingProfileLinkTimestampColumnsError(err)) throw err;
      const rows = await db.select(linkRowBase).from(links).where(eq(links.id, id)).limit(1);
      return rows[0] ?? null;
    }
  }

  async function getList({ where, skip, take }: any) {
    const parts = [];
    if (where?.userId !== undefined) {
      parts.push(eq(links.userId, where.userId));
    }
    if (where?.categoryId) {
      parts.push(eq(links.categoryId, where.categoryId));
    }
    const w = parts.length === 0 ? undefined : parts.length === 1 ? parts[0] : and(...parts);

    try {
      const base = db.select(linkRowFull).from(links);
      const filtered = w ? base.where(w) : base;
      const ordered = filtered.orderBy(desc(links.updatedAt), desc(links.createdAt));
      const limited = typeof take === "number" ? ordered.limit(take) : ordered;
      const paged = typeof skip === "number" ? limited.offset(skip) : limited;
      return await paged;
    } catch (err) {
      if (!isMissingProfileLinkTimestampColumnsError(err)) throw err;
      const base = db.select(linkRowBase).from(links);
      const filtered = w ? base.where(w) : base;
      const ordered = filtered.orderBy(desc(links.id));
      const limited = typeof take === "number" ? ordered.limit(take) : ordered;
      const paged = typeof skip === "number" ? limited.offset(skip) : limited;
      return await paged;
    }
  }

  async function getLinkCountsByCategoryForUser(userId: string) {
    const rows = await db
      .select({
        categoryId: links.categoryId,
        cnt: count(),
      })
      .from(links)
      .where(eq(links.userId, userId))
      .groupBy(links.categoryId);
    const out: Record<string, number> = {};
    for (const r of rows) {
      out[r.categoryId] = countResult(r.cnt);
    }
    return out;
  }

  async function create(data: any) {
    const now = new Date();
    try {
      const created = await db
        .insert(links)
        .values({ ...data, createdAt: now, updatedAt: now })
        .returning(linkRowFull);
      return created[0];
    } catch (err) {
      if (!isMissingProfileLinkTimestampColumnsError(err)) throw err;
      const created = await db
        .insert(links)
        .values({ ...data })
        .returning(linkRowBase);
      return created[0];
    }
  }

  async function update(dto: Record<string, unknown> & { id: string }) {
    const { id, ...data } = dto;
    try {
      const updated = await db
        .update(links)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(links.id, id))
        .returning(linkRowFull);
      return updated[0];
    } catch (err) {
      if (!isMissingProfileLinkTimestampColumnsError(err)) throw err;
      const updated = await db
        .update(links)
        .set({ ...data })
        .where(eq(links.id, id))
        .returning(linkRowBase);
      return updated[0];
    }
  }

  async function deleteByIds(ids: string[]) {
    try {
      return await db.delete(links).where(inArray(links.id, ids)).returning(linkRowFull);
    } catch (err) {
      if (!isMissingProfileLinkTimestampColumnsError(err)) throw err;
      return await db.delete(links).where(inArray(links.id, ids)).returning(linkRowBase);
    }
  }

  return {
    getCount,
    getListByUserId,
    getById,
    getList,
    getLinkCountsByCategoryForUser,
    create,
    update,
    deleteByIds,
  };
}

export type ProfileLinkDAL = ReturnType<typeof createProfileLinkDAL>;