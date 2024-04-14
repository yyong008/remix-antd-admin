// types
import type { RoleData, UpdateRoleData } from "~/types/index";

import prisma from "~/server/services/common/prisma";

/**
 * 获取角色列表（包含菜单）
 * @returns h
 */
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
        },
      },
    },
  });
  return roles;
};

/**
 * 创建角色
 * @param data
 * @returns
 */
export const addRole = async (data: RoleData) => {
  let role: any = null;
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

      // 更具 data 中的 menus 重新关联中的数组
      await tx.menuRole.createMany({
        data: data.menus.map((m: any) => ({ roleId: role.id, menuId: m.id })),
      });
      return role;
    });
  } catch (error) {
    console.error(error);
  }
  return role;
};

export const updateRole = async (data: UpdateRoleData) => {
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
      // 删除指定 id 的 menuRole
      const d = await tx.menuRole.deleteMany({
        where: { roleId: data.id },
      });

      if (!d) {
        throw new Error(`del userRole fail`);
      }

      // 更具 data 中的 menus 重新关联中的数组
      await tx.menuRole.createMany({
        data: data.menus.map((m: any) => ({ roleId: role.id, menuId: m.id })),
      });
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

/**
 * 获取所有菜单角色
 * @returns
 */
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
