import { asc, count, desc, eq, inArray } from "drizzle-orm";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { linkCategories } from "../../schema";

function countResult(v: unknown): number {
  if (v == null) return 0;
  if (typeof v === "bigint") return Number(v);
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

export function createProfileLinkCategoryDAL(db: DrizzleD1Database) {
  async function getCount() {
    const rows = await db.select({ count: count() }).from(linkCategories);
    return countResult(rows[0]?.count);
  }

  async function getCountByUserId(userId: string) {
    const rows = await db
      .select({ count: count() })
      .from(linkCategories)
      .where(eq(linkCategories.userId, userId));
    return countResult(rows[0]?.count);
  }

  async function getById(id: string) {
    const rows = await db.select().from(linkCategories).where(eq(linkCategories.id, id)).limit(1);
    return rows[0] ?? null;
  }

  async function getList({ where, skip, take, orderBy }: any) {
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

  async function create(data: any) {
    const created = await db.insert(linkCategories).values(data).returning();
    return created[0];
  }

  async function update({ id, ...data }: any) {
    const updated = await db
      .update(linkCategories)
      .set(data)
      .where(eq(linkCategories.id, id))
      .returning();
    return updated[0];
  }

  async function deleteByIds(ids: string[]) {
    return await db.delete(linkCategories).where(inArray(linkCategories.id, ids)).returning();
  }

  return {
    getCount,
    getCountByUserId,
    getById,
    getList,
    create,
    update,
    deleteByIds,
  };
}

export type ProfileLinkCategoryDAL = ReturnType<typeof createProfileLinkCategoryDAL>;