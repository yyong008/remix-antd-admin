import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchQuery } from "../../_base-query";

export const news = createApi({
  reducerPath: "news",
  baseQuery: fetchQuery,
  endpoints: (builder) => ({
    createNews: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/news",
        method: "POST",
        body: JSON.stringify(data),
      }),
    }),
    updateNewsById: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/news",
        method: "PUT",
        body: JSON.stringify(data),
      }),
    }),
    deleteNewsByIds: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/news",
        method: "DELETE",
        body: JSON.stringify(data),
      }),
    }),
    readNews: builder.query({
      transformResponse: (data: any) => data,
      query: (id) => ({
        url: "admin/news/" + id,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
    }),
    readNewsList: builder.query({
      transformResponse: (data: any) => data,
      query: (data) => {
        let url = `admin/news?page=${data.page || 1}&pageSize=${data.pageSize || 10}`;
        if (data.categoryId) {
          url += "&category=" + data.categoryId;
        }
        return {
          url,
          method: "GET",
        };
      },
      keepUnusedDataFor: 0,
    }),
  }),
});

export const {
  useCreateNewsMutation,
  useUpdateNewsByIdMutation,
  useDeleteNewsByIdsMutation,
  useReadNewsListQuery,
  useReadNewsQuery,
} = news;
