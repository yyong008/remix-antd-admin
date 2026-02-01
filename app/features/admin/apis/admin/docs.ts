import { getApiClient } from "~/api-client";

/**
 * 获取文档列表
 * @returns
 */
export async function getDocs(params: any) {
  try {
    const res = await getApiClient().api.admin.docs.changelog.$get({
      query: {
        page: params.page?.toString?.() ?? "1",
        pageSize: params.pageSize?.toString?.() ?? "10",
      },
    });
    return await res.json();
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
    const res = await getApiClient().api.admin.docs.changelog[":id"].$get({
      param: { id },
    });
    return await res.json();
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
    const res = await getApiClient().api.admin.docs.changelog[":id"].$put({
      param: { id },
      json: data,
    });
    return await res.json();
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
export async function deleteDocs(ids: string) {
  try {
    const res = await getApiClient().api.admin.docs.changelog.$delete({
      json: { ids },
    });
    return await res.json();
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
    const res = await getApiClient().api.admin.docs.changelog.$post({
      json: data,
    });
    return await res.json();
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
    const res = await getApiClient().api.admin.feedback.$get({
      query: {
        page: params.page?.toString?.() ?? "1",
        pageSize: params.pageSize?.toString?.() ?? "10",
      },
    });
    return await res.json();
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
    const res = await getApiClient().api.admin.feedback.$delete({
      json: { ids },
    });
    return await res.json();
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
    const res = await getApiClient().api.admin.feedback[":id"].$get({
      param: { id },
    });
    return await res.json();
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
    const res = await getApiClient().api.admin.feedback[":id"].$put({
      param: { id },
      json: data,
    });
    return await res.json();
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
    const res = await getApiClient().api.admin.feedback.$post({
      json: data,
    });
    return await res.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}
