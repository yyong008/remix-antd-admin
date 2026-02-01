import { getApiClient } from "~/api-client";

/**
 * 登陆
 * @param data
 * @returns
 */
export async function login(data: any) {
  try {
    const res = await getApiClient().api.auth.login.$post({ json: data });
    return await res.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 注册
 * @param data
 * @returns
 */
export async function register(data: any) {
  try {
    const res = await getApiClient().api.auth.register.$post({ json: data });
    return await res.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 登出
 * @returns
 */
export async function logout() {
  try {
    const res = await getApiClient().api.auth.logout.$post();
    return await res.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 刷新
 * @returns
 */
export async function refresh_token() {
  try {
    const res = await getApiClient().api.auth.refresh_token.$post();
    return await res.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}
