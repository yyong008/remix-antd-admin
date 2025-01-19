import api from "~/libs/axios";

/**
 * 创建邮件模板
 * @param data
 * @returns
 */
export async function createMailTpl(data: any) {
  try {
    return await api.post("/admin/system/mail/tpl", data);
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
export async function updateMailTplById(data: any) {
  try {
    return await api.put("/admin/system/mail/tpl", data);
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
export async function deleteMailTplByIds(data: any) {
  try {
    return await api.delete("/admin/system/mail/tpl", { data });
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 获取邮件模板详情
 * @returns
 */
export async function readMailTpl() {
  try {
    return await api.get("/admin/system/mail/tpl");
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
export async function readMailTplList(params: {
  page: number;
  pageSize: number;
}) {
  try {
    return await api.get("/admin/system/mail/tpl", { params });
  } catch (error) {
    console.error(error);
    return error;
  }
}
