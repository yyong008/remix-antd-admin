import {
  type FetchArgs,
  fetchBaseQuery,
  type BaseQueryApi,
} from "@reduxjs/toolkit/query";
import {
  getLocalStorageRefreshToken,
  setLocalStorageToken,
  setLocalStorageRefreshToken,
} from "../localstorage";
import { defaultLang } from "~/config/lang";

const JOSE_ERROR_EXP = '"exp" claim timestamp check failed';

const requestQueue: any[] = [];

const processQueue = (error: any, token = null) => {
  requestQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  requestQueue.length = 0;
};

let isRefreshing = false;

const _fetchQuery = fetchBaseQuery({
  baseUrl: "/api",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const fetchQuery = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: any,
) => {
  let result = await _fetchQuery(args, api, extraOptions);
  const { code, message } = result.data as any;
  if (code !== 0 && message === JOSE_ERROR_EXP) {
    const refreshToken = getLocalStorageRefreshToken();
    if (!refreshToken) {
      redirectToLiginWithLang();
      return result;
    }

    if (!isRefreshing) {
      qureyRefreshAndRetry(args, api, extraOptions).catch((error) => {
        isRefreshing = false;
        redirectToLiginWithLang();
        processQueue(error);
      });
    }
    const retryOriginalRequest = new Promise((resolve, reject) => {
      requestQueue.push({ resolve, reject });
    });

    return retryOriginalRequest.then((token) => {
      return _fetchQuery(args, api, extraOptions);
    });
  }
  return result;
};

async function qureyRefreshAndRetry(
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: any,
) {
  isRefreshing = true;
  // refresh_token
  let result = await _fetchQuery(
    {
      url: "refresh_token",
      method: "POST",
      body: JSON.stringify({ refresh_token: getLocalStorageRefreshToken() }),
    },
    api,
    extraOptions,
  );
  isRefreshing = false;

  const { data, code, message } = result.data as any;

  if (code === 0) {
    setLocalStorageRefreshToken(data.refresh_token);
    setLocalStorageToken(data.token);
    processQueue(null, data.token);
  } else {
    processQueue({ message });
  }
}

function redirectToLiginWithLang() {
  const lang = window.location.pathname.split("/")[1] || defaultLang;
  window.location.replace(`/${lang}/admin/login`);
}
