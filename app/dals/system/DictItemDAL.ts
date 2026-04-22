import { count, eq, inArray } from "drizzle-orm";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { dictionaryEntries } from "db/schema";

export function createDictItemDAL(db: DrizzleD1Database) {
  function mapEntry(row: any) {
    if (!row) return null;
    const { dictionaryId, ...rest } = row;
    return { ...rest, dictionary_id: dictionaryId };
  }

  async function getCount(dictionary_id: string) {
    const rows = await db
      .select({ count: count() })
      .from(dictionaryEntries)
      .where(eq(dictionaryEntries.dictionaryId, dictionary_id));
    return rows[0]?.count ?? 0;
  }

  async function getAll(dictionary_id: string) {
    const rows = await db
      .select()
      .from(dictionaryEntries)
      .where(eq(dictionaryEntries.dictionaryId, dictionary_id));
    return rows.map(mapEntry);
  }

  async function getById(id: string) {
    const rows = await db
      .select()
      .from(dictionaryEntries)
      .where(eq(dictionaryEntries.id, id))
      .limit(1);
    return mapEntry(rows[0]);
  }

  async function getList({
    dictionary_id,
    page = 1,
    pageSize = 10,
  }: {
    dictionary_id: string;
    page: number;
    pageSize: number;
  }) {
    const rows = await db
      .select()
      .from(dictionaryEntries)
      .where(eq(dictionaryEntries.dictionaryId, dictionary_id))
      .limit(pageSize)
      .offset((page - 1) * pageSize);
    return rows.map(mapEntry);
  }

  async function create(data: any) {
    const { dictionary_id, ...values } = data;
    const id =
      values.id ??
      (globalThis.crypto?.randomUUID
        ? globalThis.crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`);
    const created = await db
      .insert(dictionaryEntries)
      .values({
        ...values,
        id,
        dictionaryId: dictionary_id,
      })
      .returning();
    return mapEntry(created[0]);
  }

  async function update({ id, dictionary_id, ...data }: any) {
    const updated = await db
      .update(dictionaryEntries)
      .set({
        ...data,
        ...(dictionary_id !== undefined ? { dictionaryId: dictionary_id } : {}),
      })
      .where(eq(dictionaryEntries.id, id))
      .returning();
    return mapEntry(updated[0]);
  }

  async function deleteByIds(ids: string[]) {
    const deleted = await db
      .delete(dictionaryEntries)
      .where(inArray(dictionaryEntries.id, ids))
      .returning({ id: dictionaryEntries.id });
    return { count: deleted.length };
  }

  return {
    getCount,
    getAll,
    getById,
    getList,
    create,
    update,
    deleteByIds,
  };
}

export type DictItemDAL = ReturnType<typeof createDictItemDAL>;
