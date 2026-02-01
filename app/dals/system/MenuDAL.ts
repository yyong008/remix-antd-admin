import { count, desc, eq, inArray, ne } from "drizzle-orm";
import { db } from "@/libs/neon";
import { menuRoles, menus, userRoles } from "db/schema";

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

function mapMenuInput(data: any) {
  const { parent_menu_id, path_file, ...rest } = data;
  const parentMenuId = parent_menu_id === -1 ? null : parent_menu_id;
  return {
    ...rest,
    parentMenuId,
    pathFile: path_file,
  };
}

async function getCount() {
  const rows = await db.select({ count: count() }).from(menus);
  return rows[0]?.count ?? 0;
}

async function getAll() {
  const rows = await db.select().from(menus);
  return rows.map(mapMenu);
}

async function getList({ page, pageSize }: { page: number; pageSize: number }) {
  const rows = await db
    .select()
    .from(menus)
    .limit(pageSize)
    .offset((page - 1) * pageSize)
    .orderBy(desc(menus.id));
  return rows.map(mapMenu);
}

async function getAllFilterPermMenu() {
  const rows = await db
    .select()
    .from(menus)
    .where(ne(menus.type, permMenuType));
  return rows.map(mapMenu);
}

async function getMenuTreeByUserId(userId: number) {
  const rows = await db
    .select()
    .from(menus)
    .innerJoin(menuRoles, eq(menuRoles.menuId, menus.id))
    .innerJoin(userRoles, eq(userRoles.roleId, menuRoles.roleId))
    .where(eq(userRoles.userId, userId));

  const unique = new Map<number, any>();
  for (const row of rows) {
    const menu = mapMenu(row.menus);
    if (menu && !unique.has(menu.id)) unique.set(menu.id, menu);
  }
  return Array.from(unique.values());
}

async function create(data: any) {
  const created = await db.insert(menus).values(mapMenuInput(data)).returning();
  return mapMenu(created[0]);
}

async function update(data: any) {
  const { id, ...rest } = data;
  const updated = await db
    .update(menus)
    .set(mapMenuInput(rest))
    .where(eq(menus.id, id as number))
    .returning();
  return mapMenu(updated[0]);
}

async function deleteByIds(ids: number[]) {
  const deleted = await db
    .delete(menus)
    .where(inArray(menus.id, ids))
    .returning({ id: menus.id });
  return { count: deleted.length };
}

export const menuDAL = {
  permMenuType,
  getCount,
  getAll,
  getList,
  getAllFilterPermMenu,
  getMenuTreeByUserId,
  create,
  update,
  deleteByIds,
};
