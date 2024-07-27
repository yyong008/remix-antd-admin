import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchQuery } from "@/apis-client/_base-query";

export const systemMonitorLoginlog = createApi({
  reducerPath: "monitorLoginlog",
  baseQuery: fetchQuery,
  endpoints: (builder) => ({
    createMonitorLoginlog: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/system/monitor/loginlog",
        method: "POST",
        body: JSON.stringify(data),
      }),
    }),
    updateMonitorLoginlogById: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/system/monitor/loginlog",
        method: "PUT",
        body: JSON.stringify(data),
      }),
    }),
    deleteMonitorLoginlogByIds: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/system/monitor/loginlog",
        method: "DELETE",
        body: JSON.stringify(data),
      }),
    }),
    readMonitorLoginlog: builder.query({
      transformResponse: (data: any) => data,
      query: () => ({
        url: "admin/system/monitor/loginlog",
        method: "GET",
      }),
    }),
    readMonitorLoginlogList: builder.query({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: `admin/system/monitor/loginlog?page=${data.page}&pageSize=${data.pageSize}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateMonitorLoginlogMutation,
  useUpdateMonitorLoginlogByIdMutation,
  useDeleteMonitorLoginlogByIdsMutation,
  useReadMonitorLoginlogListQuery,
  useReadMonitorLoginlogQuery,
} = systemMonitorLoginlog;
