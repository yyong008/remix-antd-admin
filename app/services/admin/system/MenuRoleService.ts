import { menuRoleDAL } from "@/dals/system/MenuRoleDAL";

class MenuRoleService {
  /**
   * 获取菜单角色列表
   * @param menuId
   */
  async getAll(menuId: number) {
    const list = await menuRoleDAL.getAll();
    return list;
  }
}

export const menuRoleService = new MenuRoleService();
