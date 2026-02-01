import { getApiClient } from "~/api-client";

/**
 * 创建服务监控
 * @param data
 * @returns
 */
export async function createMonitorServe(data: any) {
  try {
    const res = await getApiClient().api.admin.system.monitor.serve.$post({
      json: data,
    });
    return await res.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 更新服务监控
 * @param data
 * @returns
 */
export async function updateMonitorServeById(data: any) {
  try {
    const res = await getApiClient().api.admin.system.monitor.serve.$put({
      json: data,
    });
    return await res.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 删除服务监控
 * @param data
 * @returns
 */
export async function deleteMonitorServeByIds(data: any) {
  try {
    const res = await getApiClient().api.admin.system.monitor.serve.$delete({
      json: data,
    });
    return await res.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 获取服务监控详情
 * @returns
 */
export async function readMonitorServe() {
  try {
    const res = await getApiClient().api.admin.system.monitor.serve.$get();
    return await res.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 获取服务监控列表
 * @returns
 */
export async function readMonitorServeList() {
  try {
    const res = await getApiClient().api.admin.system.monitor.serve.$get();
    return await res.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}
