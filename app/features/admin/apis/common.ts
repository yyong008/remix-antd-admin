import api from "~/libs/axios";

/**
 * 签到
 * @param data
 * @returns
 */
export async function signIn(data: any) {
  try {
    return await api.post("/signin", data);
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
    return await api.get("/userinfo");
  } catch (error) {
    console.error(error);
    return error;
  }
}
