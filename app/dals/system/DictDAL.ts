import { count, eq, inArray } from "drizzle-orm";
import { db } from "@/libs/neon";
import { dictionaries } from "db/schema";

async function getCount() {
	const rows = await db.select({ count: count() }).from(dictionaries);
	return rows[0]?.count ?? 0;
}

async function getList(data: any) {
	const skip = data.pageSize * (data.page - 1);
	const take = data.pageSize;
	return await db.select().from(dictionaries).limit(take).offset(skip);
}

async function create(data: any) {
	const created = await db.insert(dictionaries).values(data).returning();
	return created[0];
}

async function update(data: any) {
	const { id, ...values } = data;
	const updated = await db
		.update(dictionaries)
		.set(values)
		.where(eq(dictionaries.id, id))
		.returning();
	return updated[0];
}

async function deleteByIds(ids: number[]) {
	const deleted = await db
		.delete(dictionaries)
		.where(inArray(dictionaries.id, ids))
		.returning({ id: dictionaries.id });
	return { count: deleted.length };
}

export const dictDAL = {
	getCount,
	getList,
	create,
	update,
	deleteByIds,
};
