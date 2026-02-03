import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, "../.env");
dotenv.config({
	path: envPath,
});
import { and, count, eq, isNull, inArray } from "drizzle-orm";
import { db } from "../app/libs/neon";
import {
	departments,
	menuRoles,
	menus,
	roles,
	userRoles,
	user,
} from "./schema";
import { auth } from "../app/libs/auth/server";
import { adminSeed } from "./seed/users/admin";
import { adminMenuRootKeys } from "./seed/menus/admin";
import { menuSeeds, type MenuSeed } from "./seed/menus";
import { superAdminMenuMode } from "./seed/menus/superadmin";
import { superAdminSeed } from "./seed/users/superadmin";
import { userMenuRootKeys } from "./seed/menus/user";
import { userSeed } from "./seed/users/user";

async function ensureDepartment() {
	const existing = await db
		.select()
		.from(departments)
		.where(eq(departments.name, "Root"))
		.limit(1);
	const found = existing[0];
	if (found) return found;
	const created = await db
		.insert(departments)
		.values({
			name: "Root",
			description: "Root Department",
			orderNo: 1,
		})
		.returning();
	return created[0];
}

async function ensureRoles() {
	const roleDefs = [
		{
			name: "Super Admin",
			value: "super_admin",
			description: "Super Admin",
			status: 0,
		},
		{
			name: "Admin",
			value: "admin",
			description: "Admin",
			status: 0,
		},
		{
			name: "User",
			value: "user",
			description: "User",
			status: 0,
		},
	];

	const existing = await db.select().from(roles);
	const byValue = new Map(existing.map((role) => [role.value, role]));
	const createdRoles: Record<string, any> = {};

	for (const def of roleDefs) {
		const found = byValue.get(def.value);
		if (found) {
			createdRoles[def.value] = found;
			continue;
		}
		const created = await db.insert(roles).values(def).returning();
		createdRoles[def.value] = created[0];
	}

	return createdRoles;
}

async function ensureMenuItem(data: MenuSeed, parentMenuId: number | null) {
	const conditions = [
		eq(menus.name, data.name),
		eq(menus.type, data.type),
	];
	if (data.path === null || data.path === undefined) {
		conditions.push(isNull(menus.path));
	} else {
		conditions.push(eq(menus.path, data.path));
	}
	if (data.permission === null || data.permission === undefined) {
		conditions.push(isNull(menus.permission));
	} else {
		conditions.push(eq(menus.permission, data.permission));
	}
	if (parentMenuId === null) {
		conditions.push(isNull(menus.parentMenuId));
	} else {
		conditions.push(eq(menus.parentMenuId, parentMenuId));
	}

	const existing = await db
		.select()
		.from(menus)
		.where(and(...conditions))
		.limit(1);
	const found = existing[0];
	if (found) return found;

	const created = await db
		.insert(menus)
		.values({
			name: data.name,
			type: data.type,
			path: data.path ?? null,
			pathFile: data.pathFile ?? null,
			permission: data.permission ?? null,
			icon: data.icon ?? null,
			status: data.status ?? 1,
			isShow: data.isShow ?? 1,
			isCache: data.isCache ?? 0,
			isLink: data.isLink ?? 0,
			orderNo: data.orderNo ?? 1,
			description: data.description ?? null,
			remark: data.remark ?? null,
			parentMenuId,
		})
		.returning();
	return created[0];
}

async function ensureMenus() {
	const menuIds = new Map<string, number>();
	const remaining = [...menuSeeds];
	let progress = true;
	while (remaining.length && progress) {
		progress = false;
		for (let i = remaining.length - 1; i >= 0; i -= 1) {
			const item = remaining[i];
			const parentKey = item.parentKey ?? null;
			if (parentKey && !menuIds.has(parentKey)) {
				continue;
			}
			const parentMenuId = parentKey ? menuIds.get(parentKey)! : null;
			const record = await ensureMenuItem(item, parentMenuId);
			menuIds.set(item.key, record.id);
			remaining.splice(i, 1);
			progress = true;
		}
	}
	if (remaining.length) {
		const keys = remaining.map((item) => item.key).join(", ");
		throw new Error(`menu seed unresolved parents: ${keys}`);
	}
	return menuIds;
}

async function ensureUser({
	name,
	nickname,
	email,
	password,
	departmentId,
}: {
	name: string;
	nickname: string;
	email: string;
	password: string;
	departmentId: number;
}) {
	const existing = await db
		.select()
		.from(user)
		.where(eq(user.email, email.toLowerCase()))
		.limit(1);
	const found = existing[0];
	if (found) return found;

	// @ts-expect-error - better-auth endpoint typing is stricter than server usage
	await auth.api.signUpEmail({
		body: {
			name,
			email,
			password,
		},
	});

	const created = await db
		.select()
		.from(user)
		.where(eq(user.email, email.toLowerCase()))
		.limit(1);
	if (!created[0]) {
		throw new Error("create user fail");
	}
	const updated = await db
		.update(user)
		.set({
			nickname,
			status: 1,
			departmentId,
		})
		.where(eq(user.id, created[0].id))
		.returning();
	return updated[0] ?? created[0];
}

async function ensureUserRole(userId: string, roleId: number) {
	const existing = await db
		.select()
		.from(userRoles)
		.where(and(eq(userRoles.userId, userId), eq(userRoles.roleId, roleId)))
		.limit(1);
	const found = existing[0];
	if (found) return found;
	const created = await db
		.insert(userRoles)
		.values({ userId, roleId })
		.returning();
	return created[0];
}

async function ensureMenuRole(menuId: number, roleId: number) {
	const existing = await db
		.select()
		.from(menuRoles)
		.where(and(eq(menuRoles.menuId, menuId), eq(menuRoles.roleId, roleId)))
		.limit(1);
	const found = existing[0];
	if (found) return found;
	const created = await db
		.insert(menuRoles)
		.values({ menuId, roleId })
		.returning();
	return created[0];
}

async function ensureRoleMenus(roleId: number, menuIds: number[]) {
	if (!menuIds.length) return;
	const existing = await db
		.select()
		.from(menuRoles)
		.where(eq(menuRoles.roleId, roleId));
	const existingIds = new Set(existing.map((row) => row.menuId));
	const missing = menuIds.filter((id) => !existingIds.has(id));
	if (!missing.length) return;
	await db.insert(menuRoles).values(missing.map((menuId) => ({ menuId, roleId })));
}

function collectDescendantIds(allMenus: { id: number; parentMenuId: number | null }[], rootIds: number[]) {
	const byParent = new Map<number, number[]>();
	for (const item of allMenus) {
		if (item.parentMenuId === null) continue;
		const list = byParent.get(item.parentMenuId) ?? [];
		list.push(item.id);
		byParent.set(item.parentMenuId, list);
	}
	const result = new Set<number>(rootIds);
	const queue = [...rootIds];
	while (queue.length) {
		const current = queue.shift()!;
		const children = byParent.get(current) ?? [];
		for (const child of children) {
			if (!result.has(child)) {
				result.add(child);
				queue.push(child);
			}
		}
	}
	return Array.from(result);
}

async function main() {
	const department = await ensureDepartment();
	const roleMap = await ensureRoles();
	const menuIds = await ensureMenus();
	const allMenus = await db.select().from(menus);

	const superAdmin = await ensureUser({
		...superAdminSeed,
		departmentId: department.id,
	});
	const admin = await ensureUser({
		...adminSeed,
		departmentId: department.id,
	});
	const normalUser = await ensureUser({
		...userSeed,
		departmentId: department.id,
	});

	const superAdminRole = roleMap.super_admin ?? roleMap.admin;
	const adminRole = roleMap.admin ?? roleMap.super_admin;
	const userRole = roleMap.user ?? roleMap.admin;

	if (superAdminRole) {
		await ensureUserRole(superAdmin.id, superAdminRole.id);
		if (superAdminMenuMode === "all") {
			const superMenuIds = allMenus.map((item) => item.id);
			await ensureRoleMenus(superAdminRole.id, superMenuIds);
		}
	}

	if (adminRole) {
		await ensureUserRole(admin.id, adminRole.id);
		const adminRootIds = Array.from(adminMenuRootKeys)
			.map((key) => menuIds.get(key))
			.filter((id): id is number => Number.isFinite(id));
		const adminMenuIds = collectDescendantIds(allMenus, adminRootIds);
		await ensureRoleMenus(adminRole.id, adminMenuIds);
	}

	if (userRole) {
		await ensureUserRole(normalUser.id, userRole.id);
		const userRootIds = Array.from(userMenuRootKeys)
			.map((key) => menuIds.get(key))
			.filter((id): id is number => Number.isFinite(id));
		const userMenuIds = collectDescendantIds(allMenus, userRootIds);
		await ensureRoleMenus(userRole.id, userMenuIds);
	}

	// Sanity checks for a clean seed run
	const [menuCountRow] = await db.select({ count: count() }).from(menus);
	const [menuRoleCountRow] = await db.select({ count: count() }).from(menuRoles);
	const [userRoleCountRow] = await db.select({ count: count() }).from(userRoles);
	const menuCount = Number(menuCountRow?.count ?? 0);
	const menuRoleCount = Number(menuRoleCountRow?.count ?? 0);
	const userRoleCount = Number(userRoleCountRow?.count ?? 0);

	if (menuCount === 0) {
		throw new Error("seed sanity check failed: no menus inserted");
	}
	if (menuRoleCount === 0) {
		throw new Error("seed sanity check failed: no menu role bindings inserted");
	}
	if (userRoleCount === 0) {
		throw new Error("seed sanity check failed: no user role bindings inserted");
	}

	const seedUserIds = [superAdmin.id, admin.id, normalUser.id];
	const seedUserRoles = await db
		.select()
		.from(userRoles)
		.where(inArray(userRoles.userId, seedUserIds));
	if (seedUserRoles.length === 0) {
		throw new Error("seed sanity check failed: seed users have no roles");
	}
}

main()
	.catch((error) => {
		console.error("Seed failed:", error);
		process.exitCode = 1;
	})
	.finally(async () => {
		// Neon HTTP client does not require explicit disconnect
		console.log("Seed completed.");
	});
