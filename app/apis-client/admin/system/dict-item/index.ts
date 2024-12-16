import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchQuery } from "@/apis-client/_base-query";

export const systemDictItem = createApi({
  reducerPath: "systemDictItem",
  baseQuery: fetchQuery,
  endpoints: (builder) => ({
    createSystemDictItem: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: `admin/system/dict-item/${data.dictionary_id}`,
        method: "POST",
        body: JSON.stringify(data.data),
      }),
    }),
    updateSystemDictItemById: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: `admin/system/dict-item/${data.dictionary_id}`,
        method: "PUT",
        body: JSON.stringify(data.data),
      }),
    }),
    deleteSystemDictItemByIds: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: `admin/system/dict-item/${data.dictionary_id}`,
        method: "DELETE",
        body: JSON.stringify({ ids: data.ids }),
      }),
    }),
    readSystemDictItem: builder.query({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: `admin/system/dict-item/${data.dictionary_id}`,
        method: "GET",
      }),
    }),
    readSystemDictItemList: builder.query({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: `admin/system/dict-item/${data.dictionary_id}?page=${data.page}&pageSize=${data.pageSize}`,
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
