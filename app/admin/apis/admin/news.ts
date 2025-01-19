import api from "~/libs/axios";

///// news

/**
 * 创建新闻
 * @param data
 * @returns
 */
export async function createNews(data: any) {
  try {
    return await api.post("/admin/news", data);
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 更新新闻
 * @param data
 * @returns
 */
export async function updateNewsById(data: any) {
  try {
    return await api.put("/admin/news", data);
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 删除新闻
 * @param data
 * @returns
 */
export async function deleteNewsByIds(data: any) {
  try {
    return await api.delete("/admin/news", { data });
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 获取新闻详情
 * @param id
 * @returns
 */
export async function readNews(id: string) {
  try {
    return await api.get(`/admin/news/${id}`);
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 获取新闻列表
 * @param params
 * @returns
 */
export async function readNewsList(params: {
  page?: number;
  pageSize?: number;
  categoryId?: string;
}) {
  try {
    const { page = 1, pageSize = 10, categoryId } = params;
    let url = `/admin/news?page=${page}&pageSize=${pageSize}`;
    if (categoryId) {
      url += `&category=${categoryId}`;
    }
    return await api.get(url);
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 创建新闻分类
 * @param data
 * @returns
 */
export async function createNewsCategory(data: any) {
  try {
    return await api.post("/admin/news/category", data);
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 更新新闻分类
 * @param data
 * @returns
 */
export async function updateNewsCategoryById(data: any) {
  try {
    return await api.put("/admin/news/category", data);
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 删除新闻分类
 * @param data
 * @returns
 */
export async function deleteNewsCategoryByIds(data: any) {
  try {
    return await api.delete("/admin/news/category", { data });
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 获取新闻分类
 * @returns
 */
export async function readNewsCategory() {
  try {
    return await api.get("/admin/news/category");
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 获取新闻分类列表
 * @param params
 * @returns
 */
export async function readNewsCategoryList(params: {
  page: number;
  pageSize: number;
}) {
  try {
    return await api.get("/admin/news/category", { params });
  } catch (error) {
    console.error(error);
    return error;
  }
}
