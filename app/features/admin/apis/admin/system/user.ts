import { getApiClient } from "~/api-client";

/**
 * 创建用户
 * @param data
 * @returns
 */
export async function createUser(data: any) {
	try {
		const res = await getApiClient().api.admin.system.user.$post({
			json: data,
		});
		return await res.json();
	} catch (error) {
		console.error(error);
		return error;
	}
}

/**
 * 更新用户
 * @param data
 * @returns
 */
export async function updateUserById(data: any) {
	try {
		const res = await getApiClient().api.admin.system.user[":id"].$put({
			param: { id: String(data.id) },
			json: data,
		});
		return await res.json();
	} catch (error) {
		console.error(error);
		return error;
	}
}

/**
 * 删除用户
 * @param data
 * @returns
 */
export async function deleteUserByIds(data: any) {
	try {
		const res = await getApiClient().api.admin.system.user.$delete({
			json: data,
		});
		return await res.json();
	} catch (error) {
		console.error(error);
		return error;
	}
}

/**
 * 获取用户详情
 * @returns
 */
export async function getUserInfo() {
	try {
		const res = await getApiClient().api.admin.system.user.info.$get();
		return await res.json();
	} catch (error) {
		console.error(error);
		return error;
	}
}

/**
 * 获取用户列表
 * @param params
 * @returns
 */
export async function getUserList(params: {
	page?: number;
	pageSize?: number;
	name?: string;
}) {
	try {
		const res = await getApiClient().api.admin.system.user.$get({
			query: {
				page: (params.page ?? 1).toString(),
				pageSize: (params.pageSize ?? 10).toString(),
				name: params.name ?? "",
			},
		});
		return await res.json();
	} catch (error) {
		console.error(error);
		return error;
	}
}

/**
 * 用户签到
 */
export async function userSignIn() {
	try {
		const res = await getApiClient().api.admin.system.user.signin.$post();
		return await res.json();
	} catch (error) {
		console.error(error);
		return error;
	}
}
