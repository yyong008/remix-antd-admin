import { and, count, eq, inArray } from "drizzle-orm";
import { db } from "@/libs/neon";
import { menuRoles, menus, roles } from "db/schema";

function mapMenu(row: any) {
  if (!row) return null;
  const { parentMenuId, pathFile, ...rest } = row;
  return {
    ...rest,
    parent_menu_id: parentMenuId ?? null,
    path_file: pathFile ?? null,
  };
}

async function getList({ page, pageSize }: { page: number; pageSize: number }) {
  const roleRows = await db
    .select()
    .from(roles)
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  const roleIds = roleRows.map((r) => r.id);
  const menuRoleRows = roleIds.length
    ? await db
        .select()
        .from(menuRoles)
        .innerJoin(menus, eq(menuRoles.menuId, menus.id))
        .where(inArray(menuRoles.roleId, roleIds))
    : [];

  const menuRoleMap = new Map<number, any[]>();
  for (const row of menuRoleRows) {
    const roleId = row.menuRoles.roleId;
    const entry = {
      id: row.menuRoles.id,
      roleId,
      menuId: row.menuRoles.menuId,
      menus: mapMenu(row.menus),
    };
    const list = menuRoleMap.get(roleId) ?? [];
    list.push(entry);
    menuRoleMap.set(roleId, list);
  }

  return roleRows.map((role) => ({
    ...role,
    MenuRole: menuRoleMap.get(role.id) ?? [],
  }));
}

async function getAll() {
  return await db.select().from(roles);
}

async function getCount() {
  const rows = await db.select({ count: count() }).from(roles);
  return rows[0]?.count ?? 0;
}

async function create(data: any) {
  return db.transaction(async (tx) => {
    const created = await tx
      .insert(roles)
      .values({
        name: data.name,
        description: data.description,
        remark: data.remark,
        status: data.status,
        value: data.value,
      })
      .returning();
    const role = created[0];
    if (!role?.id) {
      throw new Error("create user fail");
    }
    const menusData = data.menus ?? [];
    if (menusData.length) {
      await tx.insert(menuRoles).values(
        menusData.map((m: any) => ({
          roleId: role.id,
          menuId: m.id,
        })),
      );
    }
    return role;
  });
}

async function update(data: any) {
  return db.transaction(async (tx) => {
    const existing = await tx
      .select()
      .from(roles)
      .where(eq(roles.id, data.id))
      .limit(1);
    if (!existing[0]) {
      throw new Error("create user fail");
    }

    const updated = await tx
      .update(roles)
      .set({
        name: data.name,
        description: data.description,
        remark: data.remark,
        status: data.status,
        value: data.value,
      })
      .where(eq(roles.id, data.id))
      .returning();

    const role = updated[0];
    if (!role?.id) {
      throw new Error("create user fail");
    }

    const existingMenuRoles = await tx
      .select()
      .from(menuRoles)
      .where(eq(menuRoles.roleId, data.id));
    const existingMenuIds = existingMenuRoles.map((mr) => mr.menuId);
    const menusData = data.menus ?? [];
    const menuIdsToDelete = existingMenuIds.filter(
      (id) => !menusData.some((menu: any) => menu.id === id),
    );
    const menuIdsToAdd = menusData.filter(
      (menu: any) => !existingMenuIds.includes(menu.id),
    );

    if (menuIdsToDelete.length > 0) {
      await tx
        .delete(menuRoles)
        .where(
          and(
            inArray(menuRoles.menuId, menuIdsToDelete),
            eq(menuRoles.roleId, data.id),
          ),
        );
    }

    if (menuIdsToAdd.length > 0) {
      await tx.insert(menuRoles).values(
        menuIdsToAdd.map((m: any) => ({
          roleId: data.id,
          menuId: m.id,
        })),
      );
    }
    return role;
  });
}

async function deleteByIds(ids: number[]) {
  return db.transaction(async (tx) => {
    await tx.delete(menuRoles).where(inArray(menuRoles.roleId, ids));
    const deleted = await tx
      .delete(roles)
      .where(inArray(roles.id, ids))
      .returning({ id: roles.id });
    return { count: deleted.length };
  });
}

export const roleDAL = {
  getList,
  getAll,
  getCount,
  create,
  update,
  deleteByIds,
};
