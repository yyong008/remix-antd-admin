import api from "~/libs/axios";

/**
 * 登陆
 * @param data
 * @returns
 */
export function login(data: any) {
  try {
    return api.post("/admin/login", data);
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
export function register(data: any) {
  try {
    return api.post("/admin/login", data);
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 登出
 * @returns
 */
export function logout() {
  try {
    return api.post("/admin/logout");
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 刷新
 * @returns
 */
export function refresh_token() {
  try {
    return api.post("/admin/refresh_token");
  } catch (error) {
    console.error(error);
    return error;
  }
}
