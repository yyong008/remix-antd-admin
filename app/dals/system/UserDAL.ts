import { and, count, desc, eq, inArray, like } from "drizzle-orm";
import type { TPage } from "~/types";
import { db } from "@/libs/neon";
import { departments, roles, userRoles, users } from "db/schema";

async function getById(id: number) {
	const rows = await db
		.select()
		.from(users)
		.leftJoin(departments, eq(users.departmentId, departments.id))
		.where(eq(users.id, id))
		.limit(1);

	const row = rows[0];
	if (!row) return null;

	return {
		email: row.users.email,
		avatar: row.users.avatar,
		name: row.users.name,
		nickname: row.users.nickname,
		lang: row.users.lang,
		theme: row.users.theme,
		phone: row.users.phone,
		remark: row.users.remark,
		status: row.users.status,
		createdAt: row.users.createdAt,
		updatedAt: row.users.updatedAt,
		department: row.departments ? { name: row.departments.name } : null,
	};
}

async function getCount() {
	const rows = await db.select({ count: count() }).from(users);
	return rows[0]?.count ?? 0;
}

async function getList({ page = 1, pageSize = 10, name = "" }: TPage) {
	const conditions = [] as any[];
	if (name) {
		conditions.push(like(users.name, `%${name}%`));
	}

	let query = db
		.select()
		.from(users)
		.leftJoin(departments, eq(users.departmentId, departments.id));
	if (conditions.length) query = query.where(and(...conditions));

	const userRows = await query
		.orderBy(desc(users.id))
		.limit(pageSize)
		.offset((page - 1) * pageSize);

	const userIds = userRows.map((row) => row.users.id);
	const roleRows = userIds.length
		? await db
				.select()
				.from(userRoles)
				.innerJoin(roles, eq(userRoles.roleId, roles.id))
				.where(inArray(userRoles.userId, userIds))
		: [];

	const roleMap = new Map<number, any[]>();
	for (const row of roleRows) {
		const userId = row.userRoles.userId;
		const list = roleMap.get(userId) ?? [];
		list.push({ roles: { name: row.roles.name } });
		roleMap.set(userId, list);
	}

	return userRows.map((row) => ({
		id: row.users.id,
		avatar: row.users.avatar,
		email: row.users.email,
		name: row.users.name,
		nickname: row.users.nickname,
		lang: row.users.lang,
		theme: row.users.theme,
		phone: row.users.phone,
		remark: row.users.remark,
		status: row.users.status,
		createdAt: row.users.createdAt,
		updatedAt: row.users.updatedAt,
		department: row.departments
			? {
					id: row.departments.id,
					name: row.departments.name,
				}
			: null,
		UserRole: roleMap.get(row.users.id) ?? [],
	}));
}

async function create(data: any) {
	return db.transaction(async (tx) => {
		const created = await tx
			.insert(users)
			.values({
				avatar: data.avatar,
				name: data.name,
				password: data.password,
				nickname: data.nickname,
				email: data.email,
				lang: data.lang,
				theme: data.theme,
				remark: data.remark,
				departmentId: data.departmentId as number,
				phone: data.phone,
				status: data.status,
			})
			.returning();
		const user = created[0];
		if (!user?.id) {
			throw new Error("create user fail");
		}
		const rolesList = data.roles ?? [];
		if (rolesList.length) {
			await tx.insert(userRoles).values(
				rolesList.map((roleId: number) => ({
					roleId,
					userId: user.id,
				})),
			);
		}
		return user;
	});
}

async function update({ id, ...data }: any) {
	return db.transaction(async (tx) => {
		const existing = await tx
			.select()
			.from(users)
			.where(eq(users.id, id))
			.limit(1);
		if (!existing[0]) {
			throw new Error("create user fail");
		}

		const updated = await tx
			.update(users)
			.set({
				avatar: data.avatar,
				name: data.name,
				password: data.password,
				nickname: data.nickname,
				email: data.email,
				lang: data.lang,
				theme: data.theme,
				remark: data.remark,
				departmentId: data.departmentId,
				phone: data.phone,
				status: data.status,
			})
			.where(eq(users.id, id))
			.returning();

		const user = updated[0];
		if (!user?.id) {
			throw new Error("create user fail");
		}

		await tx.delete(userRoles).where(eq(userRoles.userId, id));
		const rolesList = data.roles ?? [];
		if (rolesList.length) {
			await tx.insert(userRoles).values(
				rolesList.map((roleId: number) => ({
					roleId,
					userId: user.id,
				})),
			);
		}
		return user;
	});
}

async function deleteByIds(ids: number[]) {
	return db.transaction(async (tx) => {
		await tx.delete(userRoles).where(inArray(userRoles.userId, ids));
		const deleted = await tx
			.delete(users)
			.where(inArray(users.id, ids))
			.returning({ id: users.id });
		return { count: deleted.length };
	});
}

export const userDAL = {
	getById,
	getCount,
	getList,
	create,
	update,
	deleteByIds,
};
