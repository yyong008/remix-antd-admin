import api from "@/admin/apis";

/**
 * 创建存储配置
 * @param data
 * @returns
 */
export async function createStorage(data: any) {
  try {
    return await api.post("/admin/system/storage", data);
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 更新存储配置
 * @param data
 * @returns
 */
export async function updateStorageById(data: any) {
  try {
    return await api.put("/admin/system/storage", data);
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 删除存储配置
 * @param data
 * @returns
 */
export async function deleteStorageByIds(data: any) {
  try {
    return await api.delete("/admin/system/storage", { data });
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 获取存储配置详情
 * @returns
 */
export async function readStorage() {
  try {
    return await api.get("/admin/system/storage");
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 获取存储配置列表
 * @param params
 * @returns
 */
export async function readStorageList(params: {
  page: number;
  pageSize: number;
}) {
  try {
    return await api.get("/admin/system/storage", { params });
  } catch (error) {
    console.error(error);
    return error;
  }
}
