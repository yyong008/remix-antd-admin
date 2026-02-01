import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, "../.env");
dotenv.config({
	path: envPath,
});
import { and, eq } from "drizzle-orm";
import { db } from "../app/libs/neon";
import {
	departments,
	menuRoles,
	menus,
	roles,
	userRoles,
	users,
} from "./schema";
import { bcryptUtil } from "../app/utils/server/bcrypt.util";

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

async function ensureRole() {
	const existing = await db
		.select()
		.from(roles)
		.where(eq(roles.value, "admin"))
		.limit(1);
	const found = existing[0];
	if (found) return found;
	const created = await db
		.insert(roles)
		.values({
			name: "Admin",
			value: "admin",
			description: "Super Admin",
			status: 1,
		})
		.returning();
	return created[0];
}

async function ensureMenu() {
	const existing = await db
		.select()
		.from(menus)
		.where(eq(menus.name, "Dashboard"))
		.limit(1);
	const found = existing[0];
	if (found) return found;
	const created = await db
		.insert(menus)
		.values({
			name: "Dashboard",
			type: 1,
			path: "/admin/dashboard",
			pathFile: "admin/dashboard",
			permission: "dashboard:view",
			status: 1,
			isShow: 1,
			isCache: 0,
			isLink: 0,
			orderNo: 1,
		})
		.returning();
	return created[0];
}

async function ensureUser(departmentId: number) {
	const existing = await db
		.select()
		.from(users)
		.where(eq(users.name, "admin"))
		.limit(1);
	const found = existing[0];
	if (found) return found;
	const created = await db
		.insert(users)
		.values({
			name: "admin",
			password: bcryptUtil.hashPassword("admin123"),
			nickname: "Administrator",
			status: 1,
			departmentId,
		})
		.returning();
	return created[0];
}

async function ensureUserRole(userId: number, roleId: number) {
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

async function main() {
	const department = await ensureDepartment();
	const role = await ensureRole();
	const menu = await ensureMenu();
	const user = await ensureUser(department.id);

	await ensureUserRole(user.id, role.id);
	await ensureMenuRole(menu.id, role.id);
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
