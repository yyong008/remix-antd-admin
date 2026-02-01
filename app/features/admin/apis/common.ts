import { getApiClient } from "~/api-client";

/**
 * 签到
 * @param data
 * @returns
 */
export async function signIn(data: any) {
	try {
		const res = await getApiClient().api.admin.system.user.signin.$post({
			json: data,
		});
		return await res.json();
	} catch (error) {
		console.error(error);
		return error;
	}
}

/**
 * 获取用户信息
 * @returns
 */
export async function userinfo() {
	try {
		const res = await getApiClient().api.admin.system.user.info.$get();
		return await res.json();
	} catch (error) {
		console.error(error);
		return error;
	}
}
