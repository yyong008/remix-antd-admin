import { count, eq, inArray } from "drizzle-orm";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { sysConfig } from "../../schema";

export async function getCount(db: DrizzleD1Database) {
  const rows = await db.select({ count: count() }).from(sysConfig);
  return rows[0]?.count ?? 0;
}

export async function getList(db: DrizzleD1Database, data: any) {
  const skip = data.pageSize * (data.page - 1);
  const take = data.pageSize;
  return (await db.select().from(sysConfig).limit(take).offset(skip)) as any;
}

export async function create(db: DrizzleD1Database, data: any) {
  const id =
    data.id ??
    (globalThis.crypto?.randomUUID
      ? globalThis.crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`);
  await db.insert(sysConfig).values({ ...data, id });
  return { id, ...data };
}

export async function update(db: DrizzleD1Database, data: any) {
  const { id, ...values } = data;
  const updated = await db
    .update(sysConfig)
    .set(values)
    .where(eq(sysConfig.id, id))
    .returning();
  return updated[0];
}

export async function deleteByIds(db: DrizzleD1Database, ids: string[]) {
  const deleted = await db
    .delete(sysConfig)
    .where(inArray(sysConfig.id, ids.map(String)))
    .returning({ id: sysConfig.id });
  return { count: deleted.length };
}
