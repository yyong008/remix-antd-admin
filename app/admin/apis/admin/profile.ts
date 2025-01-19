import api from "~/libs/axios";

/**
 * 创建账户
 * @param data
 * @returns
 */
export async function createProfileAccount(data: any) {
  try {
    return await api.post("/admin/profile/account", data);
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 更新账户
 * @param data
 * @returns
 */
export async function updateProfileAccountById(data: any) {
  try {
    return await api.put("/admin/profile/account", data);
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 删除账户
 * @param data
 * @returns
 */
export async function deleteProfileAccountByIds(data: any) {
  try {
    return await api.delete("/admin/profile/account", { data });
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 获取账户详情
 * @returns
 */
export async function readProfileAccount() {
  try {
    return await api.get("/admin/profile/account");
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 获取账户列表
 * @param params
 * @returns
 */
export async function readProfileAccountList(params: {
  page: number;
  pageSize: number;
}) {
  try {
    return await api.get("/admin/profile/account", { params });
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 创建链接分类
 * @param data
 * @returns
 */
export async function createProfileLinkCategory(data: any) {
  try {
    return await api.post("/admin/profile/link/category", data);
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 更新链接分类
 * @param data
 * @returns
 */
export async function updateProfileLinkCategoryById(data: any) {
  try {
    return await api.put("/admin/profile/link/category", data);
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 删除链接分类
 * @param data
 * @returns
 */
export async function deleteProfileLinkCategoryByIds(data: any) {
  try {
    return await api.delete("/admin/profile/link/category", { data });
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 获取链接分类详情
 * @returns
 */
export async function readProfileLinkCategory() {
  try {
    return await api.get("/admin/profile/link/category");
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 获取链接分类列表
 * @param params
 * @returns
 */
export async function readProfileLinkCategoryList(params: {
  page: number;
  pageSize: number;
}) {
  try {
    return await api.get("/admin/profile/link/category", { params });
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 创建链接
 * @param data
 * @returns
 */
export async function createProfileLink(data: any) {
  try {
    return await api.post("/admin/profile/link", data);
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 更新链接
 * @param data
 * @returns
 */
export async function updateProfileLinkById(data: any) {
  try {
    return await api.put("/admin/profile/link", data);
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 删除链接
 * @param data
 * @returns
 */
export async function deleteProfileLinkByIds(data: any) {
  try {
    return await api.delete("/admin/profile/link", { data });
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 获取链接详情
 * @returns
 */
export async function readProfileLink() {
  try {
    return await api.get("/admin/profile/link");
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 获取链接列表
 * @param params
 * @returns
 */
export async function readProfileLinkList(params: {
  id: string; // 分类 ID
  page: number;
  pageSize: number;
}) {
  try {
    const { id, page, pageSize } = params;
    return await api.get(
      `/admin/profile/link?category=${id}&page=${page}&pageSize=${pageSize}`,
    );
  } catch (error) {
    console.error(error);
    return error;
  }
}
