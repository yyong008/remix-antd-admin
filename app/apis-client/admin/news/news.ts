import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchQuery } from "../../_base-query";

export const news = createApi({
  reducerPath: "news",
  baseQuery: fetchQuery,
  endpoints: (builder) => ({
    createNews: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "news",
        method: "POST",
        body: JSON.stringify(data),
      }),
    }),
    updateNewsById: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "news",
        method: "PUT",
        body: JSON.stringify(data),
      }),
    }),
    deleteNewsByIds: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "news",
        method: "DELETE",
        body: JSON.stringify(data),
      }),
    }),
    readNews: builder.query({
      transformResponse: (data: any) => data,
      query: () => ({
        url: "news",
        method: "GET",
      }),
    }),
    readNewsList: builder.query({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: `news?page=${data.page}&pageSize=${data.pageSize}`,
        method: "GET",
      }),
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
