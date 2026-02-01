import { getApiClient } from "~/api-client";

/**
 * 创建账户
 * @param data
 * @returns
 */
export async function createProfileAccount(data: any) {
	try {
		const res = await getApiClient().api.admin.profile.account.$post({
			json: data,
		});
		return await res.json();
	} catch (error) {
		console.error(error);
		return error;
	}
}

/**
 * 更新账户
 * @param data
 * @returns
 */
export async function updateProfileAccountById(data: any) {
	try {
		const res = await getApiClient().api.admin.profile.account.$put({
			json: data,
		});
		return await res.json();
	} catch (error) {
		console.error(error);
		return error;
	}
}

/**
 * 删除账户
 * @param data
 * @returns
 */
export async function deleteProfileAccountByIds(data: any) {
	try {
		const res = await getApiClient().api.admin.profile.account.$delete({
			json: data,
		});
		return await res.json();
	} catch (error) {
		console.error(error);
		return error;
	}
}

/**
 * 获取账户详情
 * @returns
 */
export async function readProfileAccount() {
	try {
		const res = await getApiClient().api.admin.profile.account.$get();
		return await res.json();
	} catch (error) {
		console.error(error);
		return error;
	}
}

/**
 * 获取账户列表
 * @param params
 * @returns
 */
export async function readProfileAccountList(params: {
	page: number;
	pageSize: number;
}) {
	try {
		const res = await getApiClient().api.admin.profile.account.$get({
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

/**
 * 创建链接分类
 * @param data
 * @returns
 */
export async function createProfileLinkCategory(data: any) {
	try {
		const res = await getApiClient().api.admin.profile.link.category.$post({
			json: data,
		});
		return await res.json();
	} catch (error) {
		console.error(error);
		return error;
	}
}

/**
 * 更新链接分类
 * @param data
 * @returns
 */
export async function updateProfileLinkCategoryById(data: any) {
	try {
		const res = await getApiClient().api.admin.profile.link.category.$put({
			json: data,
		});
		return await res.json();
	} catch (error) {
		console.error(error);
		return error;
	}
}

/**
 * 删除链接分类
 * @param data
 * @returns
 */
export async function deleteProfileLinkCategoryByIds(data: any) {
	try {
		const res = await getApiClient().api.admin.profile.link.category.$delete({
			json: data,
		});
		return await res.json();
	} catch (error) {
		console.error(error);
		return error;
	}
}

/**
 * 获取链接分类详情
 * @returns
 */
export async function readProfileLinkCategory() {
	try {
		const res = await getApiClient().api.admin.profile.link.category.$get();
		return await res.json();
	} catch (error) {
		console.error(error);
		return error;
	}
}

/**
 * 获取链接分类列表
 * @param params
 * @returns
 */
export async function readProfileLinkCategoryList(params: {
	page: number;
	pageSize: number;
}) {
	try {
		const res = await getApiClient().api.admin.profile.link.category.$get({
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

/**
 * 创建链接
 * @param data
 * @returns
 */
export async function createProfileLink(data: any) {
	try {
		const res = await getApiClient().api.admin.profile.link.$post({
			json: data,
		});
		return await res.json();
	} catch (error) {
		console.error(error);
		return error;
	}
}

/**
 * 更新链接
 * @param data
 * @returns
 */
export async function updateProfileLinkById(data: any) {
	try {
		const res = await getApiClient().api.admin.profile.link.$put({
			json: data,
		});
		return await res.json();
	} catch (error) {
		console.error(error);
		return error;
	}
}

/**
 * 删除链接
 * @param data
 * @returns
 */
export async function deleteProfileLinkByIds(data: any) {
	try {
		const res = await getApiClient().api.admin.profile.link.$delete({
			json: data,
		});
		return await res.json();
	} catch (error) {
		console.error(error);
		return error;
	}
}

/**
 * 获取链接详情
 * @returns
 */
export async function readProfileLink() {
	try {
		const res = await getApiClient().api.admin.profile.link.$get();
		return await res.json();
	} catch (error) {
		console.error(error);
		return error;
	}
}

/**
 * 获取链接列表
 * @param params
 * @returns
 */
export async function readProfileLinkList(params: {
	id: string; // 分类 ID
	page: number;
	pageSize: number;
}) {
	try {
		const res = await getApiClient().api.admin.profile.link.$get({
			query: {
				category: params.id,
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
