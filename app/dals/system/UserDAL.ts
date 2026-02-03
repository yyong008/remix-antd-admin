import { and, count, desc, eq, inArray, like } from "drizzle-orm";
import type { TPage } from "~/types";
import { db } from "@/libs/neon";
import { departments, roles, userRoles, user } from "db/schema";
import { auth } from "~/libs/auth/server";

async function getById(id: string) {
	const rows = await db
		.select()
		.from(user)
		.leftJoin(departments, eq(user.departmentId, departments.id))
		.where(eq(user.id, id))
		.limit(1);

	const row = rows[0];
	if (!row) return null;
	return {
		id: row.user.id,
		avatar: row.user.avatar ?? row.user.image ?? null,
		email: row.user.email,
		name: row.user.name,
		nickname: row.user.nickname,
			locale: row.user.locale,
		theme: row.user.theme,
		phone: row.user.phone,
		remark: row.user.remark,
		status: row.user.status,
		createdAt: row.user.createdAt,
		updatedAt: row.user.updatedAt,
		department: row.departments
			? {
					id: row.departments.id,
					name: row.departments.name,
				}
			: null,
	};
}

async function getCount() {
	const rows = await db.select({ count: count() }).from(user);
	return rows[0]?.count ?? 0;
}

async function getList({ page = 1, pageSize = 10, name = "" }: TPage) {
	const conditions = [] as any[];
	if (name) {
		conditions.push(like(user.name, `%${name}%`));
	}

	let query = db
		.select()
		.from(user)
		.leftJoin(departments, eq(user.departmentId, departments.id));
	if (conditions.length) query = query.where(and(...conditions));

	const userRows = await query
		.orderBy(desc(user.createdAt))
		.limit(pageSize)
		.offset((page - 1) * pageSize);

	const userIds = userRows.map((row) => row.user.id);
	const roleRows = userIds.length
		? await db
				.select()
				.from(userRoles)
				.innerJoin(roles, eq(userRoles.roleId, roles.id))
				.where(inArray(userRoles.userId, userIds))
		: [];

	const roleMap = new Map<string, any[]>();
	for (const row of roleRows) {
		const userId = row.userRoles.userId;
		const list = roleMap.get(userId) ?? [];
		list.push({ roles: { name: row.roles.name } });
		roleMap.set(userId, list);
	}

	return userRows.map((row) => ({
		id: row.user.id,
		avatar: row.user.avatar ?? row.user.image ?? null,
		email: row.user.email,
		name: row.user.name,
		nickname: row.user.nickname,
		locale: row.user.locale,
		theme: row.user.theme,
		phone: row.user.phone,
		remark: row.user.remark,
		status: row.user.status,
		createdAt: row.user.createdAt,
		updatedAt: row.user.updatedAt,
		department: row.departments
			? {
					id: row.departments.id,
					name: row.departments.name,
				}
			: null,
		UserRole: roleMap.get(row.user.id) ?? [],
	}));
}

function normalizeAuthEmail(input: string) {
	const value = input.trim().toLowerCase();
	if (!value) return value;
	return value.includes("@") ? value : `${value}@local`;
}

async function create(data: any) {
	const rawEmail = data?.email ?? data?.name ?? "";
	const email = normalizeAuthEmail(rawEmail);
	if (!email || !data?.password || !data?.name) {
		throw new Error("Missing required user fields");
	}

	const existing = await db
		.select()
		.from(user)
		.where(eq(user.email, email))
		.limit(1);
	if (existing[0]) {
		throw new Error("User already exists");
	}

	// Create auth user via better-auth
	// @ts-expect-error - better-auth endpoint typing is stricter than server usage
	await auth.api.signUpEmail({
		body: {
			name: data.name,
			email,
			password: data.password,
		},
	});

	const created = await db
		.select()
		.from(user)
		.where(eq(user.email, email))
		.limit(1);
	const authUser = created[0];
	if (!authUser?.id) {
		throw new Error("create user fail");
	}

	await db
		.update(user)
		.set({
			nickname: data.nickname,
			avatar: data.avatar,
			image: data.image ?? data.avatar,
			locale: data.locale,
			theme: data.theme,
			remark: data.remark,
			phone: data.phone,
			status: data.status,
			departmentId: data.departmentId as number | null,
		})
		.where(eq(user.id, authUser.id));

	const rolesList = data.roles ?? [];
	if (rolesList.length) {
		await db.insert(userRoles).values(
			rolesList.map((roleId: number) => ({
				roleId,
				userId: authUser.id,
			})),
		);
	}

	return authUser;
}

async function update({ id, ...data }: any) {
	return db.transaction(async (tx) => {
		const existing = await tx.select().from(user).where(eq(user.id, id)).limit(1);
		if (!existing[0]) {
			throw new Error("update user fail");
		}

		const updated = await tx
			.update(user)
			.set({
				avatar: data.avatar,
				image: data.image ?? data.avatar,
				name: data.name,
				nickname: data.nickname,
				email: data.email,
				locale: data.locale,
				theme: data.theme,
				remark: data.remark,
				departmentId: data.departmentId,
				phone: data.phone,
				status: data.status,
			})
			.where(eq(user.id, id))
			.returning();

		const authUser = updated[0];
		if (!authUser?.id) {
			throw new Error("update user fail");
		}

		await tx.delete(userRoles).where(eq(userRoles.userId, id));
		const rolesList = data.roles ?? [];
		if (rolesList.length) {
			await tx.insert(userRoles).values(
				rolesList.map((roleId: number) => ({
					roleId,
					userId: authUser.id,
				})),
			);
		}
		return authUser;
	});
}

async function deleteByIds(ids: string[]) {
	return db.transaction(async (tx) => {
		await tx.delete(userRoles).where(inArray(userRoles.userId, ids));
		const deleted = await tx
			.delete(user)
			.where(inArray(user.id, ids))
			.returning({ id: user.id });
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
