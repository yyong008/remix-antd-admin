import { and, eq, inArray, ne } from "drizzle-orm";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { menuRoles, menus, roles, userRoles } from "../../schema";

type MenuFlatRow = {
  id: string;
  name: string;
  type: number;
  description: string | null;
  remark: string | null;
  icon: string | null;
  path: string | null;
  path_file: string | null;
  status: number | null;
  isShow: number | null;
  isCache: number | null;
  permission: string | null;
  isLink: number | null;
  orderNo: number | null;
  createdAt: Date;
  updatedAt: Date;
  parent_menu_id: string | null;
};

type MenuTreeNode = MenuFlatRow & {
  children?: MenuTreeNode[];
};

const PERM_MENU_TYPE = 3;

function mapMenuRow(m: typeof menus.$inferSelect): MenuFlatRow {
  return {
    id: m.id,
    name: m.name,
    type: m.type,
    description: m.description,
    remark: m.remark,
    icon: m.icon,
    path: m.path,
    path_file: m.pathFile,
    status: m.status,
    isShow: m.isShow,
    isCache: m.isCache,
    permission: m.permission,
    isLink: m.isLink,
    orderNo: m.orderNo,
    createdAt: m.createdAt,
    updatedAt: m.updatedAt,
    parent_menu_id: m.parentMenuId ?? null,
  };
}

function dedupeMenus(items: MenuFlatRow[]): MenuFlatRow[] {
  const unique = new Map<string, MenuFlatRow>();
  for (const menu of items) {
    if (!unique.has(menu.id.toString())) unique.set(menu.id.toString(), menu);
  }
  return Array.from(unique.values());
}

function sortMenuFlat(items: MenuFlatRow[]): MenuFlatRow[] {
  return [...items].sort((a, b) => {
    const ao = a.orderNo ?? 0;
    const bo = b.orderNo ?? 0;
    if (ao !== bo) return ao - bo;
    return String(a.name).localeCompare(String(b.name));
  });
}

function buildMenuTreeFromFlat(flat: MenuFlatRow[]): MenuTreeNode[] {
  const map = new Map<string, MenuTreeNode>();
  const roots: MenuTreeNode[] = [];
  for (const item of flat) {
    map.set(item.id, { ...item, children: [] });
  }
  for (const item of flat) {
    const node = map.get(item.id)!;
    if (item.parent_menu_id && map.has(item.parent_menu_id)) {
      map.get(item.parent_menu_id)!.children!.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}

export async function getNavMenuFlatByUserId(
  db: DrizzleD1Database,
  userId: string,
): Promise<MenuFlatRow[]> {
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
    .where(and(eq(userRoles.userId, userId), ne(menus.type, PERM_MENU_TYPE)));
  const flat = sortMenuFlat(dedupeMenus(rows as MenuFlatRow[]));
  return flat;
}

export async function getAllFlatMenuByUserId(
  db: DrizzleD1Database,
  userId: string,
): Promise<MenuFlatRow[]> {
  const rows = await db
    .select({ menu: menus })
    .from(userRoles)
    .innerJoin(roles, eq(userRoles.roleId, roles.id))
    .innerJoin(menuRoles, eq(menuRoles.roleId, roles.id))
    .innerJoin(menus, eq(menuRoles.menuId, menus.id))
    .where(eq(userRoles.userId, userId));
  const items = rows.map((row) => mapMenuRow(row.menu)).filter(Boolean);
  return dedupeMenus(items);
}

export async function expandNavMenuWithAncestors(
  db: DrizzleD1Database,
  initial: MenuFlatRow[],
): Promise<MenuFlatRow[]> {
  const byId = new Map(initial.map((m) => [m.id, m]));
  let frontier = [...initial];
  for (;;) {
    const missing = new Set<string>();
    for (const m of frontier) {
      const pid = m.parent_menu_id;
      if (pid && !byId.has(pid)) missing.add(pid);
    }
    if (missing.size === 0) break;
    const ids = [...missing];
    const parents = await db
      .select()
      .from(menus)
      .where(and(inArray(menus.id, ids), ne(menus.type, PERM_MENU_TYPE)));
    if (parents.length === 0) break;
    frontier = [];
    for (const p of parents) {
      const row = {
        id: p.id,
        name: p.name,
        type: p.type,
        description: p.description,
        remark: p.remark,
        icon: p.icon,
        path: p.path,
        path_file: p.pathFile,
        status: p.status,
        isShow: p.isShow,
        isCache: p.isCache,
        permission: p.permission,
        isLink: p.isLink,
        orderNo: p.orderNo,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
        parent_menu_id: p.parentMenuId ?? null,
      } satisfies MenuFlatRow;
      byId.set(p.id, row);
      frontier.push(row);
    }
  }
  return sortMenuFlat(Array.from(byId.values()));
}

export async function getNavMenuFlatWithAncestors(
  db: DrizzleD1Database,
  userId: string,
): Promise<MenuFlatRow[]> {
  const flat = await getNavMenuFlatByUserId(db, userId);
  return expandNavMenuWithAncestors(db, flat);
}

export async function getRolesByUserId(db: DrizzleD1Database, userId: string) {
  const rows = await db
    .select({ id: roles.id, name: roles.name, value: roles.value })
    .from(userRoles)
    .innerJoin(roles, eq(userRoles.roleId, roles.id))
    .where(eq(userRoles.userId, userId));
  const seen = new Map<
    string,
    {
      id: string;
      name: string;
      value: string;
    }
  >();
  for (const r of rows) {
    if (!seen.has(r.id)) seen.set(r.id, r);
  }
  return [...seen.values()];
}

export async function getUserPerms(db: DrizzleD1Database, userId: string): Promise<string[]> {
  const all = await getAllFlatMenuByUserId(db, userId);
  const codes = all.map((m) => m.permission).filter((p): p is string => Boolean(p?.trim()));
  return [...new Set(codes)];
}

export async function getSessionAccess(
  db: DrizzleD1Database,
  userId: string,
): Promise<{
  menu: MenuFlatRow[];
  menuTree: MenuTreeNode[];
  permissions: string[];
  roles: {
    id: string;
    name: string;
    value: string;
  }[];
}> {
  const [menu, rolesList, permissions] = await Promise.all([
    getNavMenuFlatWithAncestors(db, userId),
    getRolesByUserId(db, userId),
    getUserPerms(db, userId),
  ]);
  const menuTree = buildMenuTreeFromFlat(menu);
  return { menu, menuTree, permissions, roles: rolesList };
}
