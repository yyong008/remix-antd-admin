import { and, asc, count, desc, eq, inArray, like } from "drizzle-orm";
import { db } from "@/libs/neon";
import { storages } from "db/schema";

async function getCount() {
	const rows = await db.select({ count: count() }).from(storages);
	return rows[0]?.count ?? 0;
}

async function getById(id: number) {
	const rows = await db
		.select()
		.from(storages)
		.where(eq(storages.id, id))
		.limit(1);
	return rows[0] ?? null;
}

async function getList({ where, skip = 0, take = 10, orderBy }: any) {
	const conditions = [] as any[];
	if (where?.userId !== undefined) {
		conditions.push(eq(storages.userId, where.userId));
	}
	if (where?.type) {
		conditions.push(eq(storages.type, where.type));
	}
	if (where?.name?.contains) {
		conditions.push(like(storages.name, `%${where.name.contains}%`));
	}

	let query = db.select().from(storages);
	if (conditions.length) query = query.where(and(...conditions));
	if (orderBy?.id === "desc") query = query.orderBy(desc(storages.id));
	if (orderBy?.id === "asc") query = query.orderBy(asc(storages.id));
	return await query.limit(take).offset(skip);
}

async function create(data: any) {
	const created = await db.insert(storages).values(data).returning();
	return created[0];
}

async function update(id: number, data: any) {
	const { id: _id, ...values } = data;
	const updated = await db
		.update(storages)
		.set(values)
		.where(eq(storages.id, id))
		.returning();
	return updated[0];
}

async function deleteByIds(ids: number[]) {
	return await db.delete(storages).where(inArray(storages.id, ids)).returning();
}

export const storageDAL = {
	getCount,
	getById,
	getList,
	create,
	update,
	deleteByIds,
};
