import { count, eq, inArray } from "drizzle-orm";
import { db } from "@/libs/neon";
import { blogCategories, blogs } from "db/schema";

async function getCount() {
	const rows = await db.select({ count: count() }).from(blogCategories);
	return rows[0]?.count ?? 0;
}

async function create(data: any) {
	const created = await db.insert(blogCategories).values(data).returning();
	return created[0];
}

async function update(data: any) {
	const { id, ...values } = data;
	const updated = await db
		.update(blogCategories)
		.set(values)
		.where(eq(blogCategories.id, id))
		.returning();
	return updated[0];
}

async function deleteByIds(ids: number[]) {
	return await db
		.delete(blogCategories)
		.where(inArray(blogCategories.id, ids))
		.returning();
}

async function getListByUserId(userId: string) {
	return await db
		.select()
		.from(blogCategories)
		.where(eq(blogCategories.userId, userId));
}

async function getById(id: number) {
	const rows = await db
		.select()
		.from(blogCategories)
		.where(eq(blogCategories.id, id))
		.limit(1);
	return rows[0] ?? null;
}

async function getAll() {
	return await db.select().from(blogCategories);
}

async function getListWithBlog() {
	return await db
		.select()
		.from(blogCategories)
		.leftJoin(blogs, eq(blogs.categoryId, blogCategories.id));
}

export const blogCategoryDAL = {
	getCount,
	create,
	update,
	deleteByIds,
	getListByUserId,
	getById,
	getAll,
	getListWithBlog,
};
