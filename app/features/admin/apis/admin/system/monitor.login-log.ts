import api from "~/libs/axios";

/**
 * 创建登录日志
 * @param data
 * @returns
 */
export async function createMonitorLoginlog(data: any) {
  try {
    return await api.post("/admin/system/monitor/loginlog", data);
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
    return await api.put("/admin/system/monitor/loginlog", data);
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
    return await api.delete("/admin/system/monitor/loginlog", { data });
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
    return await api.get("/admin/system/monitor/loginlog");
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
    return await api.get("/admin/system/monitor/loginlog", { params });
  } catch (error) {
    console.error(error);
    return error;
  }
}
