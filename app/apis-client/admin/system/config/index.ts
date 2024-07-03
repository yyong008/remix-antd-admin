import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchQuery } from "@/apis-client/_base-query";

export const systemConfig = createApi({
  reducerPath: "systemConfig",
  baseQuery: fetchQuery,
  endpoints: (builder) => ({
    createSystemConfig: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "system/config",
        method: "POST",
        body: JSON.stringify(data),
      }),
    }),
    updateSystemConfigById: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "system/config",
        method: "PUT",
        body: JSON.stringify(data),
      }),
    }),
    deleteSystemConfigByIds: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "system/config",
        method: "DELETE",
        body: JSON.stringify(data),
      }),
    }),
    readSystemConfig: builder.query({
      transformResponse: (data: any) => data,
      query: () => ({
        url: "system/config",
        method: "GET",
      }),
    }),
    readSystemConfigList: builder.query({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: `system/config?page=${data.page}&pageSize=${data.pageSize}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateSystemConfigMutation,
  useUpdateSystemConfigByIdMutation,
  useDeleteSystemConfigByIdsMutation,
  useReadSystemConfigListQuery,
  useReadSystemConfigQuery,
} = systemConfig;
