import api from "~/libs/axios";

/**
 * 获取所有角色
 * @returns
 */
export async function readRoleAll() {
  try {
    return await api.get("/admin/system/menu-role");
  } catch (error) {
    console.error(error);
    return error;
  }
}
