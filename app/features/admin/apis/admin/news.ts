import { getApiClient } from "~/api-client";

///// news

/**
 * 创建新闻
 * @param data
 * @returns
 */
export async function createNews(data: any) {
	try {
		const res = await getApiClient().api.admin.news.$post({ json: data });
		return await res.json();
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
		const res = await getApiClient().api.admin.news.$put({ json: data });
		return await res.json();
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
		const res = await getApiClient().api.admin.news.$delete({ json: data });
		return await res.json();
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
		const res = await getApiClient().api.admin.news[":id"].$get({
			param: { id },
		});
		return await res.json();
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
		const res = await getApiClient().api.admin.news.$get({
			query: {
				page: page.toString(),
				pageSize: pageSize.toString(),
				category: categoryId ?? "",
			},
		});
		return await res.json();
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
		const res = await getApiClient().api.admin.news.category.$post({
			json: data,
		});
		return await res.json();
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
		const res = await getApiClient().api.admin.news.category.$put({
			json: data,
		});
		return await res.json();
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
		const res = await getApiClient().api.admin.news.category.$delete({
			json: data,
		});
		return await res.json();
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
		const res = await getApiClient().api.admin.news.category.$get();
		return await res.json();
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
		const res = await getApiClient().api.admin.news.category.$get({
			query: {
				page: params.page.toString(),
				pageSize: params.pageSize.toString(),
			},
		});
		return await res.json();
	} catch (error) {
		console.error(error);
		return error;
	}
}
