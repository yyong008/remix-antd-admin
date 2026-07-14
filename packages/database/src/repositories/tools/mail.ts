import { asc, count, desc, eq, inArray, like } from "drizzle-orm";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { mails } from "../../schema";

export async function getCount(db: DrizzleD1Database) {
  const rows = await db.select({ count: count() }).from(mails);
  return rows[0]?.count ?? 0;
}

export async function getById(db: DrizzleD1Database, id: string) {
  const rows = await db.select().from(mails).where(eq(mails.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function getList(db: DrizzleD1Database, { where, skip = 0, take = 10, orderBy }: any) {
  let query: any = db.select().from(mails);
  if (where?.title?.contains) {
    query = query.where(like(mails.title, `%${where.title.contains}%`));
  }
  if (orderBy?.id === "desc") query = query.orderBy(desc(mails.id));
  if (orderBy?.id === "asc") query = query.orderBy(asc(mails.id));
  return (await query.limit(take).offset(skip)) as any;
}

export async function create(db: DrizzleD1Database, data: any) {
  const created = await db.insert(mails).values(data).returning();
  return created[0];
}

export async function update(db: DrizzleD1Database, id: string, data: any) {
  const { id: _id, ...values } = data;
  const updated = await db.update(mails).set(values).where(eq(mails.id, id)).returning();
  return updated[0];
}

export async function deleteByIds(db: DrizzleD1Database, ids: string[]) {
  return (await db
    .delete(mails)
    .where(inArray(mails.id, ids.map(String)))
    .returning()) as any;
}
