import api from "~/libs/axios";

/**
 * 创建菜单
 * @param data
 * @returns
 */
export async function createMenu(data: any) {
  try {
    return await api.post("/admin/system/menu", data);
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
    return await api.put("/admin/system/menu", data);
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
    return await api.delete("/admin/system/menu", { data });
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
    return await api.get("/admin/system/menu");
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
    return await api.get("/admin/system/menu", { params });
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
    return await api.get("/admin/system/menu-list", { params });
  } catch (error) {
    console.error(error);
    return error;
  }
}
