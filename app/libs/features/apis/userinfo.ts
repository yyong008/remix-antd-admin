import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchQuery } from "../basequery";
import { useSelector } from "react-redux";

export const userInfo = createApi({
  reducerPath: "userInfo",
  baseQuery: fetchQuery,
  endpoints: (builder) => ({
    getUserInfo: builder.query({
      transformResponse: (data: any) => data?.data,
      query: () => ({ url: "userinfo" }),
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useGetUserInfoQuery } = userInfo;
export const useSelectUserInfo = () =>
  useSelector(
    (state: any) =>
      state?.userInfo?.queries?.['getUserInfo("")']?.data?.userInfo,
  );
