import { count, eq, inArray } from "drizzle-orm";
import { db } from "@/libs/neon";
import { dictionaryEntries } from "db/schema";

function mapEntry(row: any) {
  if (!row) return null;
  const { dictionaryId, ...rest } = row;
  return { ...rest, dictionary_id: dictionaryId };
}

async function getCount(dictionary_id: number) {
  const rows = await db
    .select({ count: count() })
    .from(dictionaryEntries)
    .where(eq(dictionaryEntries.dictionaryId, dictionary_id));
  return rows[0]?.count ?? 0;
}

async function getAll(dictionary_id: number) {
  const rows = await db
    .select()
    .from(dictionaryEntries)
    .where(eq(dictionaryEntries.dictionaryId, dictionary_id));
  return rows.map(mapEntry);
}

async function getById(id: number) {
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
  dictionary_id: number;
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
  const created = await db
    .insert(dictionaryEntries)
    .values({
      ...values,
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

async function deleteByIds(ids: number[]) {
  const deleted = await db
    .delete(dictionaryEntries)
    .where(inArray(dictionaryEntries.id, ids))
    .returning({ id: dictionaryEntries.id });
  return { count: deleted.length };
}

export const dictItemDAL = {
  getCount,
  getAll,
  getById,
  getList,
  create,
  update,
  deleteByIds,
};
