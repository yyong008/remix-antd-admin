import prisma from "@/libs/prisma";

export class MenuRoleDAL {
  permMenuType = 3;
  /**
   * 获取所有菜单角色
   * @returns
   */
  public async getAll() {
    return await prisma.menuRole.findMany();
  }

  /**
   * 获取菜单角色
   * @returns
   */
  async getList() {
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
  }
}

export const menuRoleDAL = new MenuRoleDAL();
