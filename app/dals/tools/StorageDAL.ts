import { and, asc, count, desc, eq, inArray, like } from "drizzle-orm";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { storages } from "db/schema";

export function createStorageDAL(db: DrizzleD1Database) {
  async function getCount(where?: { userId?: number | string }) {
    const conditions = [] as any[];
    if (where?.userId !== undefined) {
      conditions.push(eq(storages.userId, String(where.userId)));
    }
    let query: any = db.select({ count: count() }).from(storages);
    if (conditions.length) query = query.where(and(...conditions));
    const rows = await query;
    return rows[0]?.count ?? 0;
  }

  async function getById(id: string) {
    const rows = await db.select().from(storages).where(eq(storages.id, id)).limit(1);
    return rows[0] ?? null;
  }

  async function getByIds(ids: string[]) {
    if (!ids.length) return [];
    return (await db
      .select()
      .from(storages)
      .where(inArray(storages.id, ids.map(String)))) as any;
  }

  async function getList({ where, skip = 0, take = 10, orderBy }: any) {
    const conditions = [] as any[];
    if (where?.userId !== undefined) {
      conditions.push(eq(storages.userId, String(where.userId)));
    }
    if (where?.type) {
      conditions.push(eq(storages.type, where.type));
    }
    if (where?.name?.contains) {
      conditions.push(like(storages.name, `%${where.name.contains}%`));
    }

    let query: any = db.select().from(storages);
    if (conditions.length) query = query.where(and(...conditions));
    if (orderBy?.id === "desc") query = query.orderBy(desc(storages.id));
    if (orderBy?.id === "asc") query = query.orderBy(asc(storages.id));
    return (await query.limit(take).offset(skip)) as any;
  }

  async function create(data: any) {
    const created = await db.insert(storages).values(data).returning();
    return created[0];
  }

  async function update(id: string, data: any) {
    const { id: _id, ...values } = data;
    const updated = await db.update(storages).set(values).where(eq(storages.id, id)).returning();
    return updated[0];
  }

  async function deleteByIds(ids: string[]) {
    return (await db
      .delete(storages)
      .where(inArray(storages.id, ids.map(String)))
      .returning()) as any;
  }

  return {
    getCount,
    getById,
    getByIds,
    getList,
    create,
    update,
    deleteByIds,
  };
}

export type StorageDAL = ReturnType<typeof createStorageDAL>;
