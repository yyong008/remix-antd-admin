import { getApiClient } from "~/api-client";

/**
 * 创建邮件模板
 * @param data
 * @returns
 */
export async function createMailTemplate(data: any) {
  try {
    const res = await getApiClient().api.admin.tools.mail.$post({
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
export async function updateMailTemplateById(data: any) {
  try {
    const res = await getApiClient().api.admin.tools.mail.$put({
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
export async function deleteMailTemplateByIds(data: any) {
  try {
    const res = await getApiClient().api.admin.tools.mail.$delete({
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
 * @param id
 * @returns
 */
export async function readMailTemplate(id: number) {
  try {
    const res = await getApiClient().api.admin.tools.mail[":id"].$get({
      param: { id: String(id) },
    });
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
export async function readMailTemplateList(params: {
  page: number;
  pageSize: number;
}) {
  try {
    const res = await getApiClient().api.admin.tools.mail.$get({
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

/**
 * 创建存储配置
 * @param data
 * @returns
 */
export async function createToolsStorage(data: any) {
  try {
    const res = await getApiClient().api.admin.tools.storage.$post({
      json: data,
    });
    return await res.json();
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
    const res = await getApiClient().api.admin.tools.storage.$put({
      json: data,
    });
    return await res.json();
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
    const res = await getApiClient().api.admin.tools.storage.$delete({
      json: data,
    });
    return await res.json();
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
    const res = await getApiClient().api.admin.tools.storage.$get();
    return await res.json();
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
    const res = await getApiClient().api.admin.tools.storage.$get({
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
