import { getApiClient } from "~/api-client";

/**
 * 创建部门
 * @param data
 * @returns
 */
export async function createSystemDept(data: any) {
	try {
		const res = await getApiClient().api.admin.system.dept.$post({
			json: data,
		});
		return await res.json();
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
		const res = await getApiClient().api.admin.system.dept.$put({ json: data });
		return await res.json();
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
		const res = await getApiClient().api.admin.system.dept.$delete({
			json: data,
		});
		return await res.json();
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
		const res = await getApiClient().api.admin.system.dept.$get();
		return await res.json();
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
		const res = await getApiClient().api.admin.system.dept.$get({
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
