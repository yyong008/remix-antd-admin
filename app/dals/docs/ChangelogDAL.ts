import { count, eq, inArray } from "drizzle-orm";
import { db } from "@/libs/neon";
import { changeLogs } from "db/schema";

async function getCount() {
	const rows = await db.select({ count: count() }).from(changeLogs);
	return rows[0]?.count ?? 0;
}

async function getById(id: number) {
	const rows = await db
		.select()
		.from(changeLogs)
		.where(eq(changeLogs.id, id))
		.limit(1);
	return rows[0] ?? null;
}

async function getList({ where, skip, take }: any) {
	let query = db.select().from(changeLogs);
	if (where?.userId !== undefined) {
		query = query.where(eq(changeLogs.userId, where.userId));
	}
	if (typeof take === "number") query = query.limit(take);
	if (typeof skip === "number") query = query.offset(skip);
	return await query;
}

async function create(data: any) {
	const created = await db.insert(changeLogs).values(data).returning();
	return created[0];
}

async function update(data: any) {
	const { id, ...values } = data;
	const updated = await db
		.update(changeLogs)
		.set(values)
		.where(eq(changeLogs.id, id))
		.returning();
	return updated[0];
}

async function deleteByIds(ids: number[]) {
	return await db
		.delete(changeLogs)
		.where(inArray(changeLogs.id, ids))
		.returning();
}

export const changeLogDAL = {
	getCount,
	getById,
	getList,
	create,
	update,
	deleteByIds,
};
