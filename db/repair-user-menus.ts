import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

import { and, count, eq, inArray } from "drizzle-orm";
import { db } from "../app/libs/neon";
import { menuRoles, menus, roles, user, userRoles } from "./schema";

type RunOptions = {
	email: string;
	roleValue: string;
	assignAllMenus: boolean;
};

function readOptions(): RunOptions {
	const email = (process.env.USER_EMAIL ?? "").trim().toLowerCase();
	const roleValue = (process.env.ROLE_VALUE ?? "admin").trim();
	const assignAllMenus =
		String(process.env.ASSIGN_ALL_MENUS ?? "true").toLowerCase() === "true";

	if (!email) {
		throw new Error("Missing USER_EMAIL env var");
	}

	return { email, roleValue, assignAllMenus };
}

async function ensureUserRole(userId: string, roleId: number) {
	const existing = await db
		.select()
		.from(userRoles)
		.where(and(eq(userRoles.userId, userId), eq(userRoles.roleId, roleId)))
		.limit(1);
	if (existing[0]) return;
	await db.insert(userRoles).values({ userId, roleId });
}

async function ensureRoleMenus(roleId: number, assignAllMenus: boolean) {
	const existing = await db
		.select({ count: count() })
		.from(menuRoles)
		.where(eq(menuRoles.roleId, roleId));
	const existingCount = Number(existing[0]?.count ?? 0);
	if (existingCount > 0 && !assignAllMenus) return;

	const allMenus = await db.select({ id: menus.id }).from(menus);
	const menuIds = allMenus.map((row) => row.id);
	if (!menuIds.length) return;

	const existingRows = await db
		.select({ menuId: menuRoles.menuId })
		.from(menuRoles)
		.where(eq(menuRoles.roleId, roleId));
	const existingIds = new Set(existingRows.map((row) => row.menuId));
	const missing = menuIds.filter((id) => !existingIds.has(id));
	if (!missing.length) return;

	await db.insert(menuRoles).values(missing.map((menuId) => ({ menuId, roleId })));
}

async function main() {
	const { email, roleValue, assignAllMenus } = readOptions();

	const userRows = await db
		.select()
		.from(user)
		.where(eq(user.email, email))
		.limit(1);
	const authUser = userRows[0];
	if (!authUser) {
		throw new Error(`User not found for email: ${email}`);
	}

	const roleRows = await db
		.select()
		.from(roles)
		.where(eq(roles.value, roleValue))
		.limit(1);
	const role = roleRows[0];
	if (!role) {
		throw new Error(`Role not found for value: ${roleValue}`);
	}

	await ensureUserRole(authUser.id, role.id);
	await ensureRoleMenus(role.id, assignAllMenus);

	const userRoleRows = await db
		.select()
		.from(userRoles)
		.where(eq(userRoles.userId, authUser.id));
	const roleIds = userRoleRows.map((row) => row.roleId);
	const menuRoleRows = roleIds.length
		? await db
				.select({ count: count() })
				.from(menuRoles)
				.where(inArray(menuRoles.roleId, roleIds))
		: [];
	const menuRoleCount = Number(menuRoleRows[0]?.count ?? 0);

	console.log({
		userId: authUser.id,
		email: authUser.email,
		roleValue,
		roleId: role.id,
		userRoleCount: userRoleRows.length,
		menuRoleCount,
	});
}

main().catch((error) => {
	console.error("repair-user-menus failed:", error);
	process.exitCode = 1;
});
