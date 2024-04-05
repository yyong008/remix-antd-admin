import { json } from "@remix-run/node";
import prisma from "~/services/common/db.server";

export async function handlePostAction(data) {
  try {
    const role = await addRole(data);
    return json({ code: 0, message: "success", data: role });
  } catch (error) {
    return json({ code: 1, message: "fail", data: [] });
  }
}

export async function handlePutAction(data) {
  try {
    const role = await updateRole(data);
    return json({ code: 0, message: "success", data: role });
  } catch (error) {
    return json({ code: 1, message: "fail", data: [] });
  }
}

export async function handleDeleteAction(ids: number[]) {
  try {
    const role = await deleteRole(ids);
    return json({ code: 0, message: "success", data: role });
  } catch (error) {
    return json({ code: 1, message: "fail", data: [] });
  }
}

export const getRoleList = async () => {
  const roles = await prisma.role.findMany({
    select: {
      id: true,
      remark: true,
      name: true,
      value: true,
      status: true,
      description: true,
      createdAt: true,
      updatedAt: true,

      MenuRole: {
        include: {
          menus: true,
          // menu: true,
        },
      },
    },
  });
  console.log(roles, "roles");
  return roles;
};

export const addRole = async (data) => {
  let role = null;
  try {
    await prisma.$transaction(async (tx) => {
      role = await tx.role.create({
        data: {
          name: data.name,
          description: data.description,
          remark: data.remark,
          status: data.status,
          value: data.value,
        },
      });
      if (!role.id) {
        throw new Error(`create user fail`);
      }

      await Promise.all(
        data.menus?.map(async (menu) => {
          await tx.menuRole.create({
            data: {
              role: { connect: { id: role.id } }, // 关联角色
              menu: { connect: { id: menu.id } }, // 关联菜单
            },
          });
        }),
      );
      return role;
    });
  } catch (error) {
    console.error(error);
  }
  return role;
};

export const updateRole = async (data) => {
  let role: any = null;
  try {
    await prisma.$transaction(async (tx) => {
      const u = await tx.role.findUnique({
        where: {
          id: data.id,
        },
      });

      if (!u) {
        throw new Error(`create user fail`);
      }
      role = await tx.role.update({
        where: { id: data.id },
        data: {
          name: data.name,
          description: data.description,
          remark: data.remark,
          status: data.status,
          value: data.value,
        },
      });

      if (!role.id) {
        throw new Error(`create user fail`);
      }

      const d = await tx.menuRole.deleteMany({
        where: { roleId: data.id },
      });

      if (!d) {
        throw new Error(`del userRole fail`);
      }

      await Promise.all(
        data.menus?.map(async (menu) => {
          await tx.menuRole.create({
            data: {
              role: { connect: { id: role.id } }, // 关联角色
              menu: { connect: { id: menu.id } }, // 关联菜单
            },
          });
        }),
      );
      return role;
    });
  } catch (error) {
    console.error(error);
  }
  return role;
};

export const deleteRole = async (ids: number[]) => {
  try {
    await prisma.$transaction(async (tx) => {
      const users = await prisma.menuRole.deleteMany({
        where: {
          roleId: {
            in: ids,
          },
        },
      });

      if (!users) {
        throw new Error(`删除关联 userRole 表数据失败`);
      }
      const role = await prisma.role.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      });
      return role;
    });
  } catch (error) {
    console.error(error);
  }
};

export const getUserRolesById = async (roleId: number) => {
  const roles = await prisma.menuRole.findMany({
    where: {
      roleId,
    },
  });

  return roles;
};

export const getMenuRoles = async () => {
  const roles = await prisma.menuRole.findMany({
    select: {
      id: true,
      roleId: true,
      menuId: true,
      menus: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return roles;
};
