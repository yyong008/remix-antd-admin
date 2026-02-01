import { getApiClient } from "~/api-client";

/**
 * 获取所有角色
 * @returns
 */
export async function readRoleAll() {
  try {
    const res = await getApiClient().api.admin.system["menu-role"].$get();
    return await res.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}
