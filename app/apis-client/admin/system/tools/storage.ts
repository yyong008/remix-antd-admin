import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchQuery } from "@/apis-client/_base-query";

export const systemToolsStorage = createApi({
  reducerPath: "storage",
  baseQuery: fetchQuery,
  endpoints: (builder) => ({
    createStorage: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "system/storage",
        method: "POST",
        body: JSON.stringify(data),
      }),
    }),
    updateStorageById: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "system/storage",
        method: "PUT",
        body: JSON.stringify(data),
      }),
    }),
    deleteStorageByIds: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "system/storage",
        method: "DELETE",
        body: JSON.stringify(data),
      }),
    }),
    readStorage: builder.query({
      transformResponse: (data: any) => data,
      query: () => ({
        url: "system/storage",
        method: "GET",
      }),
    }),
    readStorageList: builder.query({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: `system/storage?page=${data.page}&pageSize=${data.pageSize}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateStorageMutation,
  useUpdateStorageByIdMutation,
  useDeleteStorageByIdsMutation,
  useReadStorageListQuery,
  useReadStorageQuery,
} = systemToolsStorage;
