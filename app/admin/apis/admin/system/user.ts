import api from "~/libs/axios";

/**
 * 创建用户
 * @param data
 * @returns
 */
export async function createUser(data: any) {
  try {
    return await api.post("/admin/system/user", data);
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 更新用户
 * @param data
 * @returns
 */
export async function updateUserById(data: any) {
  try {
    return await api.put("/admin/system/user", data);
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 删除用户
 * @param data
 * @returns
 */
export async function deleteUserByIds(data: any) {
  try {
    return await api.delete("/admin/system/user", { data });
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 获取用户详情
 * @returns
 */
export async function getUserInfo() {
  try {
    return await api.get("/admin/system/user/info");
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 获取用户列表
 * @param params
 * @returns
 */
export async function getUserList(params: {
  page: number;
  pageSize: number;
  name?: string;
}) {
  try {
    return await api.get("/admin/system/user", { params });
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function userSignIn(data = {}) {
  try {
    return await api.post("/admin/system/user/signin", data); // devlogger middleware print request body
  } catch (error) {
    console.error(error);
    return error;
  }
}
