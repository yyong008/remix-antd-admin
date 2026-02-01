import { count, eq, inArray } from "drizzle-orm";
import { db } from "@/libs/neon";
import { departments } from "db/schema";

async function getCount() {
  const rows = await db.select({ count: count() }).from(departments);
  return rows[0]?.count ?? 0;
}

async function getById(id: number) {
  const rows = await db
    .select()
    .from(departments)
    .where(eq(departments.id, id))
    .limit(1);
  return rows[0] ?? null;
}

async function getAll() {
  return await db.select().from(departments);
}

async function getList(data: any) {
  const skip = data.pageSize * (data.page - 1);
  const take = data.pageSize;
  return await db.select().from(departments).limit(take).offset(skip);
}

async function create(data: any) {
  const created = await db.insert(departments).values(data).returning();
  return created[0];
}

async function update({ id, ...data }: any) {
  const updated = await db
    .update(departments)
    .set(data)
    .where(eq(departments.id, id))
    .returning();
  return updated[0];
}

async function deleteByIds(ids: number[]) {
  const deleted = await db
    .delete(departments)
    .where(inArray(departments.id, ids))
    .returning({ id: departments.id });
  return { count: deleted.length };
}

export const deptDAL = {
  getCount,
  getById,
  getAll,
  getList,
  create,
  update,
  deleteByIds,
};
