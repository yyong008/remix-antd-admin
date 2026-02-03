import { count, eq, inArray } from "drizzle-orm";
import { db } from "@/libs/neon";
import { blogTags } from "db/schema";

async function getCount() {
	const rows = await db.select({ count: count() }).from(blogTags);
	return rows[0]?.count ?? 0;
}

async function getList() {
	return await db.select().from(blogTags);
}

async function getListByUserId(userId: string) {
	return await db.select().from(blogTags).where(eq(blogTags.userId, userId));
}

async function getById(id: number) {
	const rows = await db
		.select()
		.from(blogTags)
		.where(eq(blogTags.id, id))
		.limit(1);
	return rows[0] ?? null;
}

async function create(data: any) {
	const created = await db.insert(blogTags).values(data).returning();
	return created[0];
}

async function update(data: any) {
	const { id, ...values } = data;
	const updated = await db
		.update(blogTags)
		.set(values)
		.where(eq(blogTags.id, id))
		.returning();
	return updated[0];
}

async function deleteById(id: number) {
	const deleted = await db
		.delete(blogTags)
		.where(eq(blogTags.id, id))
		.returning();
	return deleted[0] ?? null;
}

async function deleteByIds(ids: number[]) {
	return await db.delete(blogTags).where(inArray(blogTags.id, ids)).returning();
}

export const blogTagDAL = {
	getCount,
	getList,
	getListByUserId,
	getById,
	create,
	update,
	deleteById,
	deleteByIds,
};
