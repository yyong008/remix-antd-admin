import prisma from "@/libs/prisma";

export class RoleDAL {
  /**
   * 获取角色列表
   * @returns
   */
  async getList({ page, pageSize }: { page: number; pageSize: number }) {
    const roles = await prisma.role.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      // orderBy: {
      //   createdAt: "desc",
      // },
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
  }
  /**
   * 获取所有角色
   * @returns
   */
  async getAll() {
    return await prisma.role.findMany({});
  }

  /**
   * 获取角色总数
   * @returns
   */
  async getCount() {
    return await prisma.role.count({});
  }

  /**
   * 创建角色
   * @param data
   * @returns
   */
  async create(data: any) {
    return prisma.$transaction(async (tx) => {
      let role = await tx.role.create({
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
        data: data.menus.map((m: any) => ({
          roleId: role.id,
          menuId: m.id,
        })),
      });
      return role;
    });
  }

  /**
   * 更新角色
   * @param data
   * @returns
   */
  async update(data: any) {
    return prisma.$transaction(async (tx) => {
      const u = await tx.role.findUnique({
        where: {
          id: data.id,
        },
      });

      if (!u) {
        throw new Error(`create user fail`);
      }
      let role = await tx.role.update({
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
        data: data.menus.map((m: any) => ({
          roleId: role.id,
          menuId: m.id,
        })),
      });
      return role;
    });
  }

  /**
   * 根据 ids 删除
   * @param ids
   * @returns
   */
  async deleteByIds(ids: any) {
    return prisma.$transaction(async (tx) => {
      const users = await tx.menuRole.deleteMany({
        where: {
          roleId: {
            in: ids,
          },
        },
      });

      if (!users) {
        throw new Error(`删除关联 userRole 表数据失败`);
      }
      const role = await tx.role.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      });
      return role;
    });
  }
}

export const roleDAL = new RoleDAL();
