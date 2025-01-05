import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchQuery } from "@/apis-client/_base-query";

export const systemMonitorOperate = createApi({
  reducerPath: "monitorOperate",
  baseQuery: fetchQuery,
  endpoints: (builder) => ({
    createMonitorOperate: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/system/monitor/operate",
        method: "POST",
        body: JSON.stringify(data),
      }),
    }),
    updateMonitorOperateById: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/system/monitor/operate",
        method: "PUT",
        body: JSON.stringify(data),
      }),
    }),
    deleteMonitorOperateByIds: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/system/monitor/operate",
        method: "DELETE",
        body: JSON.stringify(data),
      }),
    }),
    readMonitorOperate: builder.query({
      transformResponse: (data: any) => data,
      query: () => ({
        url: "admin/system/monitor/operate",
        method: "GET",
      }),
    }),
    readMonitorOperateList: builder.query({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: `admin/system/monitor/operate?page=${data.page}&pageSize=${data.pageSize}`,
        method: "GET",
      }),
    }),
  }),
});
