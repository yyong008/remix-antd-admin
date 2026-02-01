import { getApiClient } from "~/api-client";

/**
 * 创建字典
 * @param data
 * @returns
 */
export async function createSystemDict(data: any) {
	try {
		const res = await getApiClient().api.admin.system.dict.$post({
			json: data,
		});
		return await res.json();
	} catch (error) {
		console.error(error);
		return error;
	}
}

/**
 * 更新字典
 * @param data
 * @returns
 */
export async function updateSystemDictById(data: any) {
	try {
		const res = await getApiClient().api.admin.system.dict.$put({ json: data });
		return await res.json();
	} catch (error) {
		console.error(error);
		return error;
	}
}

/**
 * 删除字典
 * @param data
 * @returns
 */
export async function deleteSystemDictByIds(data: any) {
	try {
		const res = await getApiClient().api.admin.system.dict.$delete({
			json: data,
		});
		return await res.json();
	} catch (error) {
		console.error(error);
		return error;
	}
}

/**
 * 获取字典详情
 * @returns
 */
export async function readSystemDict() {
	try {
		const res = await getApiClient().api.admin.system.dict.$get();
		return await res.json();
	} catch (error) {
		console.error(error);
		return error;
	}
}

/**
 * 获取字典列表
 * @param params
 * @returns
 */
export async function readSystemDictList(params: {
	page: number;
	pageSize: number;
}) {
	try {
		const res = await getApiClient().api.admin.system.dict.$get({
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
