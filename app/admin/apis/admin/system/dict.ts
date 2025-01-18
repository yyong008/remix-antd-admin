import api from "@/admin/apis";

/**
 * 创建字典
 * @param data
 * @returns
 */
export async function createSystemDict(data: any) {
  try {
    return await api.post("/admin/system/dict", data);
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 更新字典
 * @param data
 * @returns
 */
export async function updateSystemDictById(data: any) {
  try {
    return await api.put("/admin/system/dict", data);
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 删除字典
 * @param data
 * @returns
 */
export async function deleteSystemDictByIds(data: any) {
  try {
    return await api.delete("/admin/system/dict", { data });
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 获取字典详情
 * @returns
 */
export async function readSystemDict() {
  try {
    return await api.get("/admin/system/dict");
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 获取字典列表
 * @param params
 * @returns
 */
export async function readSystemDictList(params: {
  page: number;
  pageSize: number;
}) {
  try {
    return await api.get("/admin/system/dict", { params });
  } catch (error) {
    console.error(error);
    return error;
  }
}
