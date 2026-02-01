import { getApiClient } from "~/api-client";

/**
 * 创建角色
 * @param data
 * @returns
 */
export async function createRole(data: any) {
  try {
    const res = await getApiClient().api.admin.system.role.$post({ json: data });
    return await res.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 更新角色
 * @param data
 * @returns
 */
export async function updateRoleById(data: any) {
  try {
    const res = await getApiClient().api.admin.system.role.$put({ json: data });
    return await res.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 删除角色
 * @param data
 * @returns
 */
export async function deleteRoleByIds(data: any) {
  try {
    const res = await getApiClient().api.admin.system.role.$delete({ json: data });
    return await res.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 获取角色详情
 * @returns
 */
export async function readRole() {
  try {
    const res = await getApiClient().api.admin.system.role.$get();
    return await res.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 获取角色列表
 * @param params
 * @returns
 */
export async function readRoleList(params: { page: number; pageSize: number }) {
  try {
    const res = await getApiClient().api.admin.system.role.$get({
      query: {
        page: params.page.toString(),
        pageSize: params.pageSize.toString(),
      },
    });
    return await res.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}
