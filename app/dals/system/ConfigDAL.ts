import { count, eq, inArray } from "drizzle-orm";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { sysConfig } from "db/schema";

export function createConfigDAL(db: DrizzleD1Database) {
  async function getCount() {
    const rows = await db.select({ count: count() }).from(sysConfig);
    return rows[0]?.count ?? 0;
  }

  async function getList(data: any) {
    const skip = data.pageSize * (data.page - 1);
    const take = data.pageSize;
    return await db.select().from(sysConfig).limit(take).offset(skip);
  }

  async function create(data: any) {
    const id =
      data.id ??
      (globalThis.crypto?.randomUUID
        ? globalThis.crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`);
    await db.insert(sysConfig).values({ ...data, id });
    return { id, ...data };
  }

  async function update(data: any) {
    const { id, ...values } = data;
    const updated = await db.update(sysConfig).set(values).where(eq(sysConfig.id, id)).returning();
    return updated[0];
  }

  async function deleteByIds(ids: (string | number)[]) {
    const deleted = await db
      .delete(sysConfig)
      .where(inArray(sysConfig.id, ids))
      .returning({ id: sysConfig.id });
    return { count: deleted.length };
  }

  return {
    getCount,
    getList,
    create,
    update,
    deleteByIds,
  };
}

export type ConfigDAL = ReturnType<typeof createConfigDAL>;
