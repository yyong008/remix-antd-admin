import api from "~/libs/axios";

/**
 * 用户登陆
 * @param data
 * @returns
 */
export async function login(data: any) {
  try {
    return api.post("/auth/login", data);
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 用户注册
 * @param data
 * @returns
 */
export async function register(data: any) {
  try {
    return api.post("/auth/register", data);
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * 用户注销
 * @returns
 */
export async function logout() {
  try {
    return api.post("/auth/logout");
  } catch (error) {
    console.error(error);
    return error;
  }
}

// 刷新 token
export async function refresh_token(data: any) {
  try {
    return api.post("/auth/refresh_token", data);
  } catch (error) {
    console.error(error);
    return error;
  }
}
