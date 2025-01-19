import api from "~/libs/axios";

/**
 * 获取博客列表
 * @param params
 * @returns
 */
export function getBlogs(params: any) {
  try {
    return api.get("/admin/blog", { params });
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 删除博客
 * @param id
 * @returns
 *  */
export function deleteBlog(id: string) {
  try {
    return api.delete(`/admin/blog/${id}`);
  } catch (error) {
    console.error(error);
    return error;
  }
}

export function deleteManyBlogs(ids: string[]) {
  try {
    return api.delete("/admin/blog", { data: { ids } });
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 更新博客
 * @param id
 * @param data
 * @returns
 * */
export function updateBlog(id: string, data: any) {
  try {
    return api.put(`/admin/blog/${id}`, data);
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 创建博客
 * @param data
 * @returns
 * */
export function createBlog(data: any) {
  try {
    return api.post("/admin/blog", data);
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 获取博客详情
 * @param id
 * @returns
 * */
export function getBlogDetail(id: string) {
  try {
    return api.get(`/admin/blog/${id}`);
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 获取博客分类
 * @returns
 */
export function getBlogCategories() {
  try {
    return api.get("/admin/blog/category");
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 创建博客分类
 * @param data
 * @returns
 */
export function createBlogCategory(data: any) {
  try {
    return api.post("/admin/blog/category", data);
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 根据 ids 删除博客分类
 * @param ids
 * @returns
 */
export function deleteManyBlogsCategory(ids: string) {
  try {
    return api.delete(`/admin/blog/category`, { data: { ids } });
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 更新博客分类
 * @param id
 *
 * @returns
 * */
export function updateBlogCategory(id: string, data: any) {
  try {
    return api.put(`/admin/blog/category/${id}`, data);
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 获取博客分类详情
 * @param id
 * @returns
 */
export function getBlogCategoryDetail(id: string) {
  try {
    return api.get(`/admin/blog/category/${id}`);
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 获取博客标签
 * @returns
 */
export function getBlogTags(params: any) {
  try {
    return api.get("/admin/blog/tag", { params });
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 创建博客标签
 * @param data
 * @returns
 * */
export function createBlogTag(data: any) {
  try {
    return api.post("/admin/blog/tag", data);
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 根据 ids 删除博客标签
 * @param ids
 * @returns
 * */
export function deleteManyBlogsTag(ids: string) {
  try {
    return api.delete(`/admin/blog/tag`, { data: { ids } });
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 更新博客标签
 * @param id
 * @param data
 * @returns
 * */
export function updateBlogTag(id: string, data: any) {
  try {
    return api.put(`/admin/blog/tag/${id}`, data);
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 获取博客标签详情
 * @param id
 * @returns
 * */
export function getBlogTagDetail(id: string) {
  try {
    return api.get(`/admin/blog/tag/${id}`);
  } catch (error) {
    console.error(error);
    return error;
  }
}
