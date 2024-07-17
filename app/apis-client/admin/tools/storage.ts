import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchQuery } from "../../_base-query";

export const toolsStorage = createApi({
  reducerPath: "toolsStorage",
  baseQuery: fetchQuery,
  endpoints: (builder) => ({
    createToolsStorage: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/tools/storage",
        method: "POST",
        body: JSON.stringify(data),
      }),
    }),
    updateToolsStorageById: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/tools/storage",
        method: "PUT",
        body: JSON.stringify(data),
      }),
    }),
    deleteToolsStorageByIds: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/tools/storage",
        method: "DELETE",
        body: JSON.stringify(data),
      }),
    }),
    readToolsStorage: builder.query({
      transformResponse: (data: any) => data,
      query: () => ({
        url: "admin/tools/storage",
        method: "GET",
      }),
    }),
    readToolsStorageList: builder.query({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: `admin/tools/storage?page=${data.page}&pageSize=${data.pageSize}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateToolsStorageMutation,
  useUpdateToolsStorageByIdMutation,
  useDeleteToolsStorageByIdsMutation,
  useReadToolsStorageListQuery,
  useReadToolsStorageQuery,
} = toolsStorage;
