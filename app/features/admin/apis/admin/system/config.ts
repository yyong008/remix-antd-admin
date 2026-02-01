import { getApiClient } from "~/api-client";

/**
 * 创建系统配置
 * @param data
 * @returns
 */
export async function createSystemConfig(data: any) {
  try {
    const res = await getApiClient().api.admin.system.config.$post({
      json: data,
    });
    return await res.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 更新系统配置
 * @param data
 * @returns
 */
export async function updateSystemConfigById(data: any) {
  try {
    const res = await getApiClient().api.admin.system.config.$put({
      json: data,
    });
    return await res.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 删除系统配置
 * @param data
 * @returns
 */
export async function deleteSystemConfigByIds(data: any) {
  try {
    const res = await getApiClient().api.admin.system.config.$delete({
      json: data,
    });
    return await res.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 获取系统配置详情
 * @returns
 */
export async function readSystemConfig() {
  try {
    const res = await getApiClient().api.admin.system.config.$get();
    return await res.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 获取系统配置列表
 * @param params
 * @returns
 */
export async function readSystemConfigList(params: {
  page: number;
  pageSize: number;
}) {
  try {
    const res = await getApiClient().api.admin.system.config.$get({
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
