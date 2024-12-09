import { menuDAL } from "./MenuDAL";

class UserPermsDAL {
  /**
   * 根据用户 id 获取菜单(无权限)
   * @param userId 用户id 用户 id
   * @returns
   */
  async getFlatMenuByUserId(userId: number) {
    const user = await menuDAL.getMenuTreeByUserId(userId);
    const menus = user?.UserRole?.map(({ roles }) => roles)
      ?.map((role) => role.MenuRole)
      ?.reduce((p, c) => p.concat(c), [])
      ?.map((m) => m.menus)
      .filter((m) => m.type !== 3);
    return [...new Set(menus)];
  }
  /**
   * 根据用户获取所有菜单
   * @param userId 用户id
   * @returns
   */
  async getAllFlatMenuByUserId(userId: number) {
    const user = await menuDAL.getMenuTreeByUserId(userId);
    const menus = user?.UserRole?.map(({ roles }) => roles)
      ?.map((role) => role.MenuRole)
      ?.reduce((p, c) => p.concat(c), [])
      ?.map((m) => m.menus);
    return [...new Set(menus)];
  }

  /**
   * 根据 用户 id 获取用户权限
   * @param userId 用户id
   * @returns
   */
  async getUserPerms(userId: number) {
    const menus = await this.getAllFlatMenuByUserId(userId);
    return menus.filter((e) => e.permission).map((m) => m.permission);
  }
}

export const userPermsDAL = new UserPermsDAL();
