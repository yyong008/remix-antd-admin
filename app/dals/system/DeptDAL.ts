import { count, eq, inArray } from "drizzle-orm";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { departments } from "db/schema";

export function createDeptDAL(db: DrizzleD1Database) {
  async function getCount() {
    const rows = await db.select({ count: count() }).from(departments);
    return rows[0]?.count ?? 0;
  }

  async function getById(id: string) {
    const rows = await db.select().from(departments).where(eq(departments.id, id)).limit(1);
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
    // Normalize snake_case fields to camelCase for Drizzle column names
    const normalizedData = {
      name: data.name as string,
      description: data.description ?? null,
      orderNo: data.orderNo ?? 0,
      parentDepartmentId: data.parent_department_id ?? null,
    };
    const id = globalThis.crypto?.randomUUID
      ? globalThis.crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const created = await db
      .insert(departments)
      .values({ ...normalizedData, id })
      .returning();
    return created[0];
  }

  async function update({ id, ...data }: any) {
    // Normalize snake_case fields to camelCase for Drizzle column names
    const normalizedData = {
      name: data.name,
      description: data.description ?? null,
      orderNo: data.orderNo ?? null,
      parentDepartmentId: data.parent_department_id ?? null,
    };
    const updated = await db
      .update(departments)
      .set(normalizedData)
      .where(eq(departments.id, id))
      .returning();
    return updated[0];
  }

  async function deleteByIds(ids: string[]) {
    const deleted = await db
      .delete(departments)
      .where(inArray(departments.id, ids))
      .returning({ id: departments.id });
    return { count: deleted.length };
  }

  return {
    getCount,
    getById,
    getAll,
    getList,
    create,
    update,
    deleteByIds,
  };
}

export type DeptDAL = ReturnType<typeof createDeptDAL>;
