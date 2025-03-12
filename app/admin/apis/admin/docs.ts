import api from "~/libs/axios";

/**
 * 获取文档列表
 * @returns
 */
export async function getDocs(params: any) {
  try {
    return await api.get("/admin/docs/changelog", { params });
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 获取文档详情
 * @param id
 * @return
 * */
export async function getDoc(id: string) {
  try {
    return await api.get(`/admin/docs/changelog/${id}`);
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 更新文档
 * @param id
 * @param data
 * @returns
 * */
export async function updateDoc(id: string, data: any) {
  try {
    return await api.put(`/admin/docs/changelog/${id}`, data);
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 删除文档
 * @param id
 * @returns
 * */
export async function deleteDocsByIds(ids: number[]) {
  try {
    return await api.delete(`/admin/docs/changelog`, { data: { ids } });
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 创建文档
 * @param data
 * @returns
 * */
export async function createDoc(data: any) {
  try {
    return await api.post("/admin/docs/changelog", data);
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 获取反馈列表
 * @param params
 * @returns
 */
export async function getFeedbacks(params: any) {
  try {
    return await api.get("/admin/feedback", { params });
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 删除反馈
 * @param id
 * @returns
 * */
export async function deleteFeedbacks(ids: string) {
  try {
    return await api.delete(`/admin/feedback`, { data: { ids } });
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 获取反馈
 * @param id
 * @returns
 * */
export async function getFeedback(id: string) {
  try {
    return await api.get(`/admin/feedback/${id}`);
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 更新反馈
 * @param id
 * @param data
 * @returns
 * */
export async function updateFeedback(id: string, data: any) {
  try {
    return await api.put(`/admin/feedback/${id}`, data);
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 创建 反馈
 * @param data
 * @returns
 * */
export async function createFeedback(data: any) {
  try {
    return await api.post("/admin/feedback", data);
  } catch (error) {
    console.error(error);
    return error;
  }
}
