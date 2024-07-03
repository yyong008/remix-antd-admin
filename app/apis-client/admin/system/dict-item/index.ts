import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchQuery } from "@/apis-client/_base-query";

export const systemDictItem = createApi({
  reducerPath: "systemDictItem",
  baseQuery: fetchQuery,
  endpoints: (builder) => ({
    createSystemDictItem: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "system/dict-item",
        method: "POST",
        body: JSON.stringify(data),
      }),
    }),
    updateSystemDictItemById: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "system/dict-item",
        method: "PUT",
        body: JSON.stringify(data),
      }),
    }),
    deleteSystemDictItemByIds: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "system/dict-item",
        method: "DELETE",
        body: JSON.stringify(data),
      }),
    }),
    readSystemDictItem: builder.query({
      transformResponse: (data: any) => data,
      query: () => ({
        url: "system/dict-item",
        method: "GET",
      }),
    }),
    readSystemDictItemList: builder.query({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: `system/dict-item?page=${data.page}&pageSize=${data.pageSize}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateSystemDictItemMutation,
  useUpdateSystemDictItemByIdMutation,
  useDeleteSystemDictItemByIdsMutation,
  useReadSystemDictItemListQuery,
  useReadSystemDictItemQuery,
} = systemDictItem;
