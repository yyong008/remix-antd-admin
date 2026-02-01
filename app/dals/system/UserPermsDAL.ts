import { menuDAL } from "./MenuDAL";

async function getFlatMenuByUserId(userId: number) {
	const menus = await menuDAL.getMenuTreeByUserId(userId);
	const filtered = menus.filter((menu) => menu.type !== 3);
	const unique = new Map<number, any>();
	for (const menu of filtered) {
		if (!unique.has(menu.id)) unique.set(menu.id, menu);
	}
	return Array.from(unique.values());
}

async function getAllFlatMenuByUserId(userId: number) {
	const menus = await menuDAL.getMenuTreeByUserId(userId);
	const unique = new Map<number, any>();
	for (const menu of menus) {
		if (!unique.has(menu.id)) unique.set(menu.id, menu);
	}
	return Array.from(unique.values());
}

async function getUserPerms(userId: number) {
	const menus = await getAllFlatMenuByUserId(userId);
	return menus.filter((e) => e.permission).map((m) => m.permission);
}

export const userPermsDAL = {
	getFlatMenuByUserId,
	getAllFlatMenuByUserId,
	getUserPerms,
};
