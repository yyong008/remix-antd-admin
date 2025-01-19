import api from "~/libs/axios";

/**
 * 创建系统配置
 * @param data
 * @returns
 */
export async function createSystemConfig(data: any) {
  try {
    return await api.post("/admin/system/config", data);
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
    return await api.put("/admin/system/config", data);
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
    return await api.delete("/admin/system/config", { data });
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
    return await api.get("/admin/system/config");
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
    return await api.get("/admin/system/config", { params });
  } catch (error) {
    console.error(error);
    return error;
  }
}
