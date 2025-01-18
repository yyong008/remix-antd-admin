import axios from "axios";

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
  (response) => {
    // 对响应数据做处理（比如统一的错误处理）
    return response.data; // 只返回数据，去掉不必要的包装
  },
  (error) => {
    // 统一的错误处理
    if (error.response) {
      // 服务器返回了错误响应
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

export default api;
