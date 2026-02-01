import { getApiClient } from "~/api-client";

/**
 * 创建登录日志
 * @param data
 * @returns
 */
export async function createMonitorLoginlog(data: any) {
  try {
    const res = await getApiClient().api.admin.system.monitor.loginlog.$post({
      json: data,
    });
    return await res.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 更新登录日志
 * @param data
 * @returns
 */
export async function updateMonitorLoginlogById(data: any) {
  try {
    const res = await getApiClient().api.admin.system.monitor.loginlog.$put({
      json: data,
    });
    return await res.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 删除登录日志
 * @param data
 * @returns
 */
export async function deleteMonitorLoginlogByIds(data: any) {
  try {
    const res = await getApiClient().api.admin.system.monitor.loginlog.$delete({
      json: data,
    });
    return await res.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 获取登录日志详情
 * @returns
 */
export async function readMonitorLoginlog() {
  try {
    const res = await getApiClient().api.admin.system.monitor.loginlog.$get();
    return await res.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 获取登录日志列表
 * @param params
 * @returns
 */
export async function readMonitorLoginlogList(params: {
  page: number;
  pageSize: number;
}) {
  try {
    const res = await getApiClient().api.admin.system.monitor.loginlog.$get({
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
