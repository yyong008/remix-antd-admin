import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchQuery } from "@/apis-client/_base-query";

export const systemDeptApi = createApi({
  reducerPath: "systemDept",
  baseQuery: fetchQuery,
  endpoints: (builder) => ({
    createsystemDept: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/system/dept",
        method: "POST",
        body: JSON.stringify(data),
      }),
    }),
    updatesystemDeptById: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/system/dept",
        method: "PUT",
        body: JSON.stringify(data),
      }),
    }),
    deletesystemDeptByIds: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/system/dept",
        method: "DELETE",
        body: JSON.stringify(data),
      }),
    }),
    readsystemDept: builder.query({
      transformResponse: (data: any) => data,
      query: () => ({
        url: "admin/system/dept",
        method: "GET",
      }),
    }),
    readsystemDeptList: builder.query({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: `admin/system/dept?page=${data.page}&pageSize=${data.pageSize}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreatesystemDeptMutation,
  useUpdatesystemDeptByIdMutation,
  useDeletesystemDeptByIdsMutation,
  useReadsystemDeptListQuery,
  useReadsystemDeptQuery,
} = systemDeptApi;
