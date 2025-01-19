import axios from "axios";
import { simpleStorage } from "./simpleStorage";

const api = axios.create({
  baseURL: "/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 在发送请求之前处理（如添加 token）
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
api.interceptors.response.use(
  async (response) => {
    const result = response.data;
    if (needRefreshToken(result)) {
      // 需要刷新 token
      const refreshResponse: any = await api.post("/auth/refresh_token", {
        refresh_token: simpleStorage.getRefreshToken(),
      });
      if (refreshResponse && refreshResponse.code === 0) {
        // 刷新成功，重新请求
        simpleStorage.setToken(refreshResponse.data.data.token);
        simpleStorage.setRefreshToken(refreshResponse.data.data.refresh_token);
        response.config.headers["Authorization"] =
          `Bearer ${refreshResponse.data.data.token}`;
        return await api.request(response.config);
      } else {
        // 刷新失败，跳转到登录页
        window.location.href = "/login";
      }
    }

    // 对响应数据做处理（比如统一的错误处理）
    return response.data; // 只返回数据，去掉不必要的包装
  },
  async (error) => {
    // 统一的错误处理
    if (error.response) {
      console.error("Response Error:", error.response.data);
    } else if (error.request) {
      // 请求被发出去，但没有响应
      console.error("Request Error:", error.request);
    } else {
      // 其他错误
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  },
);

function needRefreshToken(result: any) {
  if (
    result.code === 1 &&
    result.message === `"exp" claim timestamp check failed`
  ) {
    return true;
  }
  return false;
}

export default api;
