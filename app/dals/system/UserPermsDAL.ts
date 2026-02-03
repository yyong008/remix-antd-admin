import { db } from "@/libs/neon";
import { and, eq, ne } from "drizzle-orm";
import { menuRoles, menus, roles, userRoles } from "db/schema";

const permMenuType = 3;

function mapMenu(row: any) {
	if (!row) return null;
	const { parentMenuId, pathFile, ...rest } = row;
	return {
		...rest,
		parent_menu_id: parentMenuId ?? null,
		path_file: pathFile ?? null,
	};
}

async function getFlatMenuByUserId(userId: string) {
	const rows = await db
		.select({
			id: menus.id,
			name: menus.name,
			type: menus.type,
			description: menus.description,
			remark: menus.remark,
			icon: menus.icon,
			path: menus.path,
			path_file: menus.pathFile,
			status: menus.status,
			isShow: menus.isShow,
			isCache: menus.isCache,
			permission: menus.permission,
			isLink: menus.isLink,
			orderNo: menus.orderNo,
			createdAt: menus.createdAt,
			updatedAt: menus.updatedAt,
			parent_menu_id: menus.parentMenuId,
		})
		.from(userRoles)
		.innerJoin(roles, eq(userRoles.roleId, roles.id))
		.innerJoin(menuRoles, eq(menuRoles.roleId, roles.id))
		.innerJoin(menus, eq(menuRoles.menuId, menus.id))
		.where(and(eq(userRoles.userId, userId), ne(menus.type, permMenuType)));
	const items = rows.filter(Boolean);
	const unique = new Map<number, any>();
	for (const menu of items) {
		if (!unique.has(menu.id)) unique.set(menu.id, menu);
	}
	return Array.from(unique.values());
}

async function getAllFlatMenuByUserId(userId: string) {
	const rows = await db
		.select({ menu: menus })
		.from(userRoles)
		.innerJoin(roles, eq(userRoles.roleId, roles.id))
		.innerJoin(menuRoles, eq(menuRoles.roleId, roles.id))
		.innerJoin(menus, eq(menuRoles.menuId, menus.id))
		.where(eq(userRoles.userId, userId));
	const items = rows.map((row) => mapMenu(row.menu)).filter(Boolean);
	const unique = new Map<number, any>();
	for (const menu of items) {
		if (!unique.has(menu.id)) unique.set(menu.id, menu);
	}
	return Array.from(unique.values());
}

async function getUserPerms(userId: string) {
	const menus = await getAllFlatMenuByUserId(userId);
	return menus.filter((e) => e.permission).map((m) => m.permission);
}

export const userPermsDAL = {
	getFlatMenuByUserId,
	getAllFlatMenuByUserId,
	getUserPerms,
};
