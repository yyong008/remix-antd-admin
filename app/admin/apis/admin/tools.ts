import api from "@/admin/apis";

/**
 * 创建邮件模板
 * @param data
 * @returns
 */
export async function createMailTemplate(data: any) {
  try {
    return await api.post("/admin/tools/mail", data);
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 更新邮件模板
 * @param data
 * @returns
 */
export async function updateMailTemplateById(data: any) {
  try {
    return await api.put("/admin/tools/mail", data);
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 删除邮件模板
 * @param data
 * @returns
 */
export async function deleteMailTemplateByIds(data: any) {
  try {
    return await api.delete("/admin/tools/mail", { data });
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 获取邮件模板详情
 * @param id
 * @returns
 */
export async function readMailTemplate(id: number) {
  try {
    return await api.get(`/admin/tools/mail/${id}`);
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 获取邮件模板列表
 * @param params
 * @returns
 */
export async function readMailTemplateList(params: {
  page: number;
  pageSize: number;
}) {
  try {
    return await api.get("/admin/tools/mail", { params });
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 创建存储配置
 * @param data
 * @returns
 */
export async function createToolsStorage(data: any) {
  try {
    return await api.post("/admin/tools/storage", data);
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
export async function updateToolsStorageById(data: any) {
  try {
    return await api.put("/admin/tools/storage", data);
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
export async function deleteToolsStorageByIds(data: any) {
  try {
    return await api.delete("/admin/tools/storage", { data });
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 获取存储配置详情
 * @returns
 */
export async function readToolsStorage() {
  try {
    return await api.get("/admin/tools/storage");
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
export async function readToolsStorageList(params: {
  page: number;
  pageSize: number;
}) {
  try {
    return await api.get("/admin/tools/storage", { params });
  } catch (error) {
    console.error(error);
    return error;
  }
}
