import { asc, count, desc, eq, inArray } from "drizzle-orm";
import { db } from "@/libs/neon";
import { linkCategories } from "db/schema";

async function getCount() {
	const rows = await db.select({ count: count() }).from(linkCategories);
	return rows[0]?.count ?? 0;
}

async function getCountByUserId(userId: number) {
	const rows = await db
		.select({ count: count() })
		.from(linkCategories)
		.where(eq(linkCategories.userId, userId));
	return rows[0]?.count ?? 0;
}

async function getById(id: number) {
	const rows = await db
		.select()
		.from(linkCategories)
		.where(eq(linkCategories.id, id))
		.limit(1);
	return rows[0] ?? null;
}

async function getList({ where, skip, take, orderBy }: any) {
	let query = db.select().from(linkCategories);
	if (where?.userId !== undefined) {
		query = query.where(eq(linkCategories.userId, where.userId));
	}
	if (orderBy?.id === "desc") query = query.orderBy(desc(linkCategories.id));
	if (orderBy?.id === "asc") query = query.orderBy(asc(linkCategories.id));
	if (typeof take === "number") query = query.limit(take);
	if (typeof skip === "number") query = query.offset(skip);
	return await query;
}

async function create(data: any) {
	const created = await db.insert(linkCategories).values(data).returning();
	return created[0];
}

async function update({ id, ...data }: any) {
	const updated = await db
		.update(linkCategories)
		.set(data)
		.where(eq(linkCategories.id, id))
		.returning();
	return updated[0];
}

async function deleteByIds(ids: number[]) {
	return await db
		.delete(linkCategories)
		.where(inArray(linkCategories.id, ids))
		.returning();
}

export const profileLinkCategoryDAL = {
	getCount,
	getCountByUserId,
	getById,
	getList,
	create,
	update,
	deleteByIds,
};
