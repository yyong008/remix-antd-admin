import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchQuery } from "../../_base-query";

export const newsCategory = createApi({
  reducerPath: "newsCategory",
  baseQuery: fetchQuery,
  endpoints: (builder) => ({
    createNewsCategory: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "news/category",
        method: "POST",
        body: JSON.stringify(data),
      }),
    }),
    updateNewsCategoryById: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "news/category",
        method: "PUT",
        body: JSON.stringify(data),
      }),
    }),
    deleteNewsCategoryByIds: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "news/category",
        method: "DELETE",
        body: JSON.stringify(data),
      }),
    }),
    readNewsCategory: builder.query({
      transformResponse: (data: any) => data,
      query: () => ({
        url: "news/category",
        method: "GET",
      }),
    }),
    readNewsCategoryList: builder.query({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: `news/category?page=${data.page}&pageSize=${data.pageSize}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateNewsCategoryMutation,
  useUpdateNewsCategoryByIdMutation,
  useDeleteNewsCategoryByIdsMutation,
  useReadNewsCategoryListQuery,
  useReadNewsCategoryQuery,
} = newsCategory;
