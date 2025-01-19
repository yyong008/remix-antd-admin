import api from "~/libs/axios";

/**
 * 创建服务监控
 * @param data
 * @returns
 */
export async function createMonitorServe(data: any) {
  try {
    return await api.post("/admin/system/monitor/serve", data);
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
    return await api.put("/admin/system/monitor/serve", data);
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
    return await api.delete("/admin/system/monitor/serve", { data });
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
    return await api.get("/admin/system/monitor/serve");
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
    return await api.get("/admin/system/monitor/serve");
  } catch (error) {
    console.error(error);
    return error;
  }
}
