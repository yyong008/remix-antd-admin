import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { useSelector } from "react-redux";

export const userInfo = createApi({
  reducerPath: "userInfo",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getUserInfo: builder.query({
      transformResponse: (data: any) => data?.data,
      query: () => ({ url: "userinfo" }),
    }),
  }),
});

export const { useGetUserInfoQuery } = userInfo;
export const useSelectUserInfo = () =>
  useSelector(
    (state: any) =>
      state?.userInfo?.queries?.['getUserInfo("")']?.data?.userInfo,
  );
