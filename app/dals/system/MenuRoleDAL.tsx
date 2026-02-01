import { count, eq } from "drizzle-orm";
import { db } from "@/libs/neon";
import { menuRoles, menus } from "db/schema";

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

async function getCount() {
  const rows = await db.select({ count: count() }).from(menuRoles);
  return rows[0]?.count ?? 0;
}

async function getAll() {
  return await db.select().from(menuRoles);
}

async function getList() {
  const rows = await db
    .select()
    .from(menuRoles)
    .innerJoin(menus, eq(menuRoles.menuId, menus.id));
  return rows.map((row) => ({
    id: row.menuRoles.id,
    roleId: row.menuRoles.roleId,
    menuId: row.menuRoles.menuId,
    menus: mapMenu(row.menus),
  }));
}

export const menuRoleDAL = {
  permMenuType,
  getCount,
  getAll,
  getList,
};
