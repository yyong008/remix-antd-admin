import { count, eq, inArray } from "drizzle-orm";
import { db } from "@/libs/neon";
import { links } from "db/schema";

async function getCount(userId: number) {
  const rows = await db
    .select({ count: count() })
    .from(links)
    .where(eq(links.userId, userId));
  return rows[0]?.count ?? 0;
}

async function getListByUserId(userId: number) {
  return await db.select().from(links).where(eq(links.userId, userId));
}

async function getById(id: number) {
  const rows = await db.select().from(links).where(eq(links.id, id)).limit(1);
  return rows[0] ?? null;
}

async function getList({ where, skip, take }: any) {
  let query = db.select().from(links);
  if (where?.userId !== undefined) {
    query = query.where(eq(links.userId, where.userId));
  }
  if (typeof take === "number") query = query.limit(take);
  if (typeof skip === "number") query = query.offset(skip);
  return await query;
}

async function create(data: any) {
  const created = await db.insert(links).values(data).returning();
  return created[0];
}

async function update({ id, ...data }: any) {
  const updated = await db
    .update(links)
    .set(data)
    .where(eq(links.id, id))
    .returning();
  return updated[0];
}

async function deleteByIds(ids: number[]) {
  return await db.delete(links).where(inArray(links.id, ids)).returning();
}

export const profileLinkDAL = {
  getCount,
  getListByUserId,
  getById,
  getList,
  create,
  update,
  deleteByIds,
};
