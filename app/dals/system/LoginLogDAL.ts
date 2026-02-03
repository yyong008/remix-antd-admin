import { and, count, desc, eq, inArray, like } from "drizzle-orm";
import type { TPage } from "@/types";
import { db } from "@/libs/neon";
import { loginLogs } from "db/schema";

async function create(data: any) {
	const created = await db.insert(loginLogs).values(data).returning();
	return created[0];
}

async function getCount() {
	const rows = await db.select({ count: count() }).from(loginLogs);
	return rows[0]?.count ?? 0;
}

async function getLoginLogList(data: TPage) {
	const conditions = [] as any[];
	if (data.name) {
		conditions.push(like(loginLogs.name, `%${data.name}%`));
	}
	let query = db.select().from(loginLogs);
	if (conditions.length) query = query.where(and(...conditions));
	return await query
		.orderBy(desc(loginLogs.id))
		.limit(data.pageSize ?? 10)
		.offset(((data.page ?? 1) - 1) * (data.pageSize ?? 10));
}

async function getLoginLogLatestByUserId(userId: string) {
	const rows = await db
		.select()
		.from(loginLogs)
		.where(eq(loginLogs.userId, userId))
		.orderBy(desc(loginLogs.id))
		.limit(1);
	return rows[0] ?? null;
}

async function deleteByIds(ids: number[]) {
	const deleted = await db
		.delete(loginLogs)
		.where(inArray(loginLogs.id, ids))
		.returning({ id: loginLogs.id });
	return { count: deleted.length };
}

export const loginLogDAL = {
	create,
	getCount,
	getLoginLogList,
	getLoginLogLatestByUserId,
	deleteByIds,
};
