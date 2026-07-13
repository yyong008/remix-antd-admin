import { count, eq, inArray } from "drizzle-orm";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { dictionaries } from "../../schema";

export async function getCount(db: DrizzleD1Database) {
  const rows = await db.select({ count: count() }).from(dictionaries);
  return rows[0]?.count ?? 0;
}

export async function getList(db: DrizzleD1Database, data: any) {
  const skip = data.pageSize * (data.page - 1);
  const take = data.pageSize;
  return (await db.select().from(dictionaries).limit(take).offset(skip)) as any;
}

export async function create(db: DrizzleD1Database, data: any) {
  const id =
    data.id ??
    (globalThis.crypto?.randomUUID
      ? globalThis.crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`);
  const created = await db
    .insert(dictionaries)
    .values({ ...data, id })
    .returning();
  return created[0];
}

export async function update(db: DrizzleD1Database, data: any) {
  const { id, ...values } = data;
  const updated = await db
    .update(dictionaries)
    .set(values)
    .where(eq(dictionaries.id, id))
    .returning();
  return updated[0];
}

export async function deleteByIds(db: DrizzleD1Database, ids: string[]) {
  const deleted = await db
    .delete(dictionaries)
    .where(inArray(dictionaries.id, ids))
    .returning({ id: dictionaries.id });
  return { count: deleted.length };
}

export async function checkIntegrity(db: DrizzleD1Database) {
  return { ok: true };
}
