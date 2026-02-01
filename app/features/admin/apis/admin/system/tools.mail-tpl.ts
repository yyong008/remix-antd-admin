import { getApiClient } from "~/api-client";

/**
 * 创建邮件模板
 * @param data
 * @returns
 */
export async function createMailTpl(data: any) {
  try {
    const res = await getApiClient().api.admin.system.mail.tpl.$post({
      json: data,
    });
    return await res.json();
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
    const res = await getApiClient().api.admin.system.mail.tpl.$put({
      json: data,
    });
    return await res.json();
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
    const res = await getApiClient().api.admin.system.mail.tpl.$delete({
      json: data,
    });
    return await res.json();
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
    const res = await getApiClient().api.admin.system.mail.tpl.$get();
    return await res.json();
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
    const res = await getApiClient().api.admin.system.mail.tpl.$get({
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
