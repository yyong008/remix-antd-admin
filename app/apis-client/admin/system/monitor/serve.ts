import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchQuery } from "@/apis-client/_base-query";

export const systemMonitorServe = createApi({
  reducerPath: "monitorServe",
  baseQuery: fetchQuery,
  endpoints: (builder) => ({
    createMonitorServe: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/system/monitor/serve",
        method: "POST",
        body: JSON.stringify(data),
      }),
    }),
    updateMonitorServeById: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/system/monitor/serve",
        method: "PUT",
        body: JSON.stringify(data),
      }),
    }),
    deleteMonitorServeByIds: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/system/monitor/serve",
        method: "DELETE",
        body: JSON.stringify(data),
      }),
    }),
    readMonitorServe: builder.query({
      transformResponse: (data: any) => data,
      query: () => ({
        url: "admin/system/monitor/serve",
        method: "GET",
      }),
    }),
    readMonitorServeList: builder.query({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: `admin/system/monitor/serve?page=${data.page}&pageSize=${data.pageSize}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateMonitorServeMutation,
  useUpdateMonitorServeByIdMutation,
  useDeleteMonitorServeByIdsMutation,
  useReadMonitorServeListQuery,
  useReadMonitorServeQuery,
} = systemMonitorServe;
