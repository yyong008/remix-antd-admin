import { getApiClient } from "~/api-client";

/**
 * 创建操作日志
 * @param data
 * @returns
 */
export async function createMonitorOperate(data: any) {
	try {
		const res = await getApiClient().api.admin.system.monitor.operate.$post({
			json: data,
		});
		return await res.json();
	} catch (error) {
		console.error(error);
		return error;
	}
}

/**
 * 更新操作日志
 * @param data
 * @returns
 */
export async function updateMonitorOperateById(data: any) {
	try {
		const res = await getApiClient().api.admin.system.monitor.operate.$put({
			json: data,
		});
		return await res.json();
	} catch (error) {
		console.error(error);
		return error;
	}
}

/**
 * 删除操作日志
 * @param data
 * @returns
 */
export async function deleteMonitorOperateByIds(data: any) {
	try {
		const res = await getApiClient().api.admin.system.monitor.operate.$delete({
			json: data,
		});
		return await res.json();
	} catch (error) {
		console.error(error);
		return error;
	}
}

/**
 * 获取操作日志详情
 * @returns
 */
export async function readMonitorOperate() {
	try {
		const res = await getApiClient().api.admin.system.monitor.operate.$get();
		return await res.json();
	} catch (error) {
		console.error(error);
		return error;
	}
}

/**
 * 获取操作日志列表
 * @param params
 * @returns
 */
export async function readMonitorOperateList(params: {
	page: number;
	pageSize: number;
}) {
	try {
		const res = await getApiClient().api.admin.system.monitor.operate.$get({
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
