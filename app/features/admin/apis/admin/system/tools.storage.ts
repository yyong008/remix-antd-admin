import { getApiClient } from "~/api-client";

/**
 * 创建存储配置
 * @param data
 * @returns
 */
export async function createStorage(data: any) {
	try {
		const res = await getApiClient().api.admin.system.storage.$post({
			json: data,
		});
		return await res.json();
	} catch (error) {
		console.error(error);
		return error;
	}
}

/**
 * 更新存储配置
 * @param data
 * @returns
 */
export async function updateStorageById(data: any) {
	try {
		const res = await getApiClient().api.admin.system.storage.$put({
			json: data,
		});
		return await res.json();
	} catch (error) {
		console.error(error);
		return error;
	}
}

/**
 * 删除存储配置
 * @param data
 * @returns
 */
export async function deleteStorageByIds(data: any) {
	try {
		const res = await getApiClient().api.admin.system.storage.$delete({
			json: data,
		});
		return await res.json();
	} catch (error) {
		console.error(error);
		return error;
	}
}

/**
 * 获取存储配置详情
 * @returns
 */
export async function readStorage() {
	try {
		const res = await getApiClient().api.admin.system.storage.$get();
		return await res.json();
	} catch (error) {
		console.error(error);
		return error;
	}
}

/**
 * 获取存储配置列表
 * @param params
 * @returns
 */
export async function readStorageList(params: {
	page: number;
	pageSize: number;
}) {
	try {
		const res = await getApiClient().api.admin.system.storage.$get({
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
