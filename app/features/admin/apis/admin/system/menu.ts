import { getApiClient } from "~/api-client";

/**
 * 创建菜单
 * @param data
 * @returns
 */
export async function createMenu(data: any) {
  try {
    const res = await getApiClient().api.admin.system.menu.$post({ json: data });
    return await res.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 更新菜单
 * @param data
 * @returns
 */
export async function updateMenuById(data: any) {
  try {
    const res = await getApiClient().api.admin.system.menu.$put({ json: data });
    return await res.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 删除菜单
 * @param data
 * @returns
 */
export async function deleteMenuByIds(data: any) {
  try {
    const res = await getApiClient().api.admin.system.menu.$delete({
      json: data,
    });
    return await res.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 获取菜单详情
 * @returns
 */
export async function readMenu() {
  try {
    const res = await getApiClient().api.admin.system.menu.$get();
    return await res.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 获取菜单列表
 * @param params
 * @returns
 */
export async function readMenuList(params: {
  page: number;
  pageSize: number;
  lang: string;
}) {
  try {
    const res = await getApiClient().api.admin.system.menu.$get({
      query: {
        page: params.page.toString(),
        pageSize: params.pageSize.toString(),
        lang: params.lang,
      },
    });
    return await res.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 获取原始菜单列表
 * @param params
 * @returns
 */
export async function readMenuListRaw(params: {
  page: number;
  pageSize: number;
  lang: string;
}) {
  try {
    const res = await getApiClient().api.admin.system["menu-list"].$get({
      query: {
        page: params.page.toString(),
        pageSize: params.pageSize.toString(),
        lang: params.lang,
      },
    });
    return await res.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}
