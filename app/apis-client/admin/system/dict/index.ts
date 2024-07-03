import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchQuery } from "@/apis-client/_base-query";

export const systemDict = createApi({
  reducerPath: "systemDict",
  baseQuery: fetchQuery,
  endpoints: (builder) => ({
    createSystemDict: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "system/dict",
        method: "POST",
        body: JSON.stringify(data),
      }),
    }),
    updateSystemDictById: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "system/dict",
        method: "PUT",
        body: JSON.stringify(data),
      }),
    }),
    deleteSystemDictByIds: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "system/dict",
        method: "DELETE",
        body: JSON.stringify(data),
      }),
    }),
    readSystemDict: builder.query({
      transformResponse: (data: any) => data,
      query: () => ({
        url: "system/dict",
        method: "GET",
      }),
    }),
    readSystemDictList: builder.query({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: `system/dict?page=${data.page}&pageSize=${data.pageSize}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateSystemDictMutation,
  useUpdateSystemDictByIdMutation,
  useDeleteSystemDictByIdsMutation,
  useReadSystemDictListQuery,
  useReadSystemDictQuery,
} = systemDict;
