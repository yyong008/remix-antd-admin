import api from "@/admin/apis";

/**
 * 创建操作日志
 * @param data
 * @returns
 */
export async function createMonitorOperate(data: any) {
  try {
    return await api.post("/admin/system/monitor/operate", data);
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 更新操作日志
 * @param data
 * @returns
 */
export async function updateMonitorOperateById(data: any) {
  try {
    return await api.put("/admin/system/monitor/operate", data);
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 删除操作日志
 * @param data
 * @returns
 */
export async function deleteMonitorOperateByIds(data: any) {
  try {
    return await api.delete("/admin/system/monitor/operate", { data });
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 获取操作日志详情
 * @returns
 */
export async function readMonitorOperate() {
  try {
    return await api.get("/admin/system/monitor/operate");
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 获取操作日志列表
 * @param params
 * @returns
 */
export async function readMonitorOperateList(params: {
  page: number;
  pageSize: number;
}) {
  try {
    return await api.get("/admin/system/monitor/operate", { params });
  } catch (error) {
    console.error(error);
    return error;
  }
}
