import { getApiClient } from "~/api-client";

///// blog

/**
 * 获取博客列表
 * @param params
 * @returns
 */
export async function readBlogList(params: {
	page?: number;
	pageSize?: number;
	categoryId?: string;
	tagId?: string;
}) {
	try {
		const res = await getApiClient().api.admin.blog.$get({
			query: {
				page: (params.page ?? 1).toString(),
				pageSize: (params.pageSize ?? 10).toString(),
				categoryId: params.categoryId ?? "",
				tagId: params.tagId ?? "",
			},
		});
		return await res.json();
	} catch (error) {
		console.error(error);
		return error;
	}
}

/**
 * 删除博客
 * @param id
 * @returns
 */
export async function deleteBlogById(id: number) {
	try {
		const res = await getApiClient().api.admin.blog[":id"].$delete({
			param: { id: String(id) },
		});
		return await res.json();
	} catch (error) {
		console.error(error);
		return error;
	}
}

/**
 * 批量删除博客
 * @param ids
 * @returns
 */
export async function deleteBlogByIds(ids: number[]) {
	try {
		const res = await getApiClient().api.admin.blog.$delete({
			json: { ids },
		});
		return await res.json();
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
 */
export async function updateBlogById(id: number, data: any) {
	try {
		const res = await getApiClient().api.admin.blog[":id"].$put({
			param: { id: String(id) },
			json: data,
		});
		return await res.json();
	} catch (error) {
		console.error(error);
		return error;
	}
}

/**
 * 创建博客
 * @param data
 * @returns
 */
export async function createBlog(data: any) {
	try {
		const res = await getApiClient().api.admin.blog.$post({ json: data });
		return await res.json();
	} catch (error) {
		console.error(error);
		return error;
	}
}

/**
 * 获取博客详情
 * @param id
 * @returns
 */
export async function readBlog(id: number) {
	try {
		const res = await getApiClient().api.admin.blog[":id"].$get({
			param: { id: String(id) },
		});
		return await res.json();
	} catch (error) {
		console.error(error);
		return error;
	}
}

/**
 * 获取博客分类
 * @returns
 */
export async function readBlogCategory() {
	try {
		const res = await getApiClient().api.admin.blog.category.$get();
		return await res.json();
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
export async function createBlogCategory(data: any) {
	try {
		const res = await getApiClient().api.admin.blog.category.$post({
			json: data,
		});
		return await res.json();
	} catch (error) {
		console.error(error);
		return error;
	}
}

/**
 * 删除博客分类
 * @param ids
 * @returns
 */
export async function deleteBlogCategoryByIds(ids: number[]) {
	try {
		const res = await getApiClient().api.admin.blog.category.$delete({
			json: { ids },
		});
		return await res.json();
	} catch (error) {
		console.error(error);
		return error;
	}
}

/**
 * 更新博客分类
 * @param id
 * @param data
 * @returns
 */
export async function updateBlogCategoryById(id: number, data: any) {
	try {
		const res = await getApiClient().api.admin.blog.category[":id"].$put({
			param: { id: String(id) },
			json: data,
		});
		return await res.json();
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
export async function readBlogCategoryById(id: number) {
	try {
		const res = await getApiClient().api.admin.blog.category[":id"].$get({
			param: { id: String(id) },
		});
		return await res.json();
	} catch (error) {
		console.error(error);
		return error;
	}
}

/**
 * 获取博客标签列表
 * @param params
 * @returns
 */
export async function readBlogTagList(params?: {
	page?: number;
	pageSize?: number;
}) {
	try {
		const res = await getApiClient().api.admin.blog.tag.$get({
			query: {
				page: (params?.page ?? 1).toString(),
				pageSize: (params?.pageSize ?? 10).toString(),
			},
		});
		return await res.json();
	} catch (error) {
		console.error(error);
		return error;
	}
}

/**
 * 创建博客标签
 * @param data
 * @returns
 */
export async function createBlogTag(data: any) {
	try {
		const res = await getApiClient().api.admin.blog.tag.$post({ json: data });
		return await res.json();
	} catch (error) {
		console.error(error);
		return error;
	}
}

/**
 * 删除博客标签
 * @param ids
 * @returns
 */
export async function deleteBlogTagByIds(ids: number[]) {
	try {
		const res = await getApiClient().api.admin.blog.tag.$delete({
			json: { ids },
		});
		return await res.json();
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
 */
export async function updateBlogTagById(id: number, data: any) {
	try {
		const res = await getApiClient().api.admin.blog.tag[":id"].$put({
			param: { id: String(id) },
			json: data,
		});
		return await res.json();
	} catch (error) {
		console.error(error);
		return error;
	}
}

/**
 * 获取博客标签详情
 * @param id
 * @returns
 */
export async function readBlogTagById(id: number) {
	try {
		const res = await getApiClient().api.admin.blog.tag[":id"].$get({
			param: { id: String(id) },
		});
		return await res.json();
	} catch (error) {
		console.error(error);
		return error;
	}
}
