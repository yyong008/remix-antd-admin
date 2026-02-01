import { asc, count, desc, inArray, like } from "drizzle-orm";
import { db } from "@/libs/neon";
import { mails } from "db/schema";

async function getCount() {
  const rows = await db.select({ count: count() }).from(mails);
  return rows[0]?.count ?? 0;
}

async function getById(id: number) {
  const rows = await db.select().from(mails).where(eq(mails.id, id)).limit(1);
  return rows[0] ?? null;
}

async function getList({ where, skip = 0, take = 10, orderBy }: any) {
  let query = db.select().from(mails);
  if (where?.title?.contains) {
    query = query.where(like(mails.title, `%${where.title.contains}%`));
  }
  if (orderBy?.id === "desc") query = query.orderBy(desc(mails.id));
  if (orderBy?.id === "asc") query = query.orderBy(asc(mails.id));
  return await query.limit(take).offset(skip);
}

async function create(data: any) {
  const created = await db.insert(mails).values(data).returning();
  return created[0];
}

async function update(id: number, data: any) {
  const { id: _id, ...values } = data;
  const updated = await db
    .update(mails)
    .set(values)
    .where(eq(mails.id, id))
    .returning();
  return updated[0];
}

async function deleteByIds(ids: number[]) {
  return await db.delete(mails).where(inArray(mails.id, ids)).returning();
}

export const mailTemplateDAL = {
  getCount,
  getById,
  getList,
  create,
  update,
  deleteByIds,
};
