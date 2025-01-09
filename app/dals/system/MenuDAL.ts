import type { Prisma } from "@prisma/client";
import prisma from "@/libs/prisma";

export class MenuDAL {
  permMenuType = 3;
  /**
   * 获取数量
   * @returns
   */
  async getCount() {
    return await prisma.menu.count();
  }

  /**
   * 获取所有的参数
   */
  async getAll() {
    return await prisma.menu.findMany();
  }

  /**
   * 获取菜单列表
   * @returns
   */
  async getList({ page, pageSize }: { page: number; pageSize: number }) {
    return await prisma.menu.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }

  /**
   * 获取过滤权限菜单列表
   * @returns
   */
  async getAllFilterPermMenu() {
    const { permMenuType } = this;
    return await prisma.menu.findMany({
      where: {
        type: {
          not: permMenuType,
        },
      },
    });
  }

  /**
   * 根据用户id获取菜单树
   */
  async getMenuTreeByUserId(userId: number) {
    // userId -> UserRole -> roles -> MenuRole -> menus
    return await prisma.user.findUnique({
      where: { id: userId },
      include: {
        UserRole: {
          include: {
            roles: {
              include: {
                MenuRole: {
                  include: {
                    menus: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  /**
   * 创建菜单
   * @param data
   * @returns
   */
  async create(data: Prisma.MenuUncheckedCreateInput) {
    return await prisma.menu.create({
      data,
    });
  }

  /**
   * 更新菜单
   * @param data
   * @returns
   */
  async update(data: Prisma.MenuUncheckedUpdateInput) {
    return await prisma.menu.update({
      where: {
        id: data.id as number,
      },
      data: {
        type: data.type,
        name: data.name,
        parent_menu_id: data.parent_menu_id,
        permission: data.permission,
        isLink: data.isLink,
        isShow: data.isShow,
        path: data.path,
        path_file: data.path_file,
        status: data.status,
        orderNo: data.orderNo,
        icon: data.icon,
      },
    });
  }

  /**
   * 根据 ids 删除菜单
   * @param ids
   * @returns
   */
  async deleteByIds(ids: number[]) {
    return await prisma.menu.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}

export const menuDAL = new MenuDAL();
