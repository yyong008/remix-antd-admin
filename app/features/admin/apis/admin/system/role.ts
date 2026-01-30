import api from "~/libs/axios";

/**
 * 创建角色
 * @param data
 * @returns
 */
export async function createRole(data: any) {
  try {
    return await api.post("/admin/system/role", data);
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 更新角色
 * @param data
 * @returns
 */
export async function updateRoleById(data: any) {
  try {
    return await api.put("/admin/system/role", data);
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 删除角色
 * @param data
 * @returns
 */
export async function deleteRoleByIds(data: any) {
  try {
    return await api.delete("/admin/system/role", { data });
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 获取角色详情
 * @returns
 */
export async function readRole() {
  try {
    return await api.get("/admin/system/role");
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 获取角色列表
 * @param params
 * @returns
 */
export async function readRoleList(params: { page: number; pageSize: number }) {
  try {
    return await api.get("/admin/system/role", { params });
  } catch (error) {
    console.error(error);
    return error;
  }
}
