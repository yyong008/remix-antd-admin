import api from "@/admin/apis";

/**
 * 创建部门
 * @param data
 * @returns
 */
export async function createSystemDept(data: any) {
  try {
    return await api.post("/admin/system/dept", data);
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 更新部门
 * @param data
 * @returns
 */
export async function updateSystemDeptById(data: any) {
  try {
    return await api.put("/admin/system/dept", data);
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 删除部门
 * @param data
 * @returns
 */
export async function deleteSystemDeptByIds(data: any) {
  try {
    return await api.delete("/admin/system/dept", { data });
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 获取部门详情
 * @returns
 */
export async function readSystemDept() {
  try {
    return await api.get("/admin/system/dept");
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 获取部门列表
 * @param params
 * @returns
 */
export async function readSystemDeptList(params: {
  page: number;
  pageSize: number;
}) {
  try {
    return await api.get("/admin/system/dept", { params });
  } catch (error) {
    console.error(error);
    return error;
  }
}
