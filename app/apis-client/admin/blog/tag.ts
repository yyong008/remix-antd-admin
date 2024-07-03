import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchQuery } from "../../_base-query";

export const blogTag = createApi({
  reducerPath: "blogTag",
  baseQuery: fetchQuery,
  endpoints: (builder) => ({
    createBlogTag: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/blog/tag",
        method: "POST",
        body: JSON.stringify(data),
      }),
    }),
    updateBlogTagById: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/blog/tag",
        method: "PUT",
        body: JSON.stringify(data),
      }),
    }),
    deleteBlogTagByIds: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/blog/tag",
        method: "DELETE",
        body: JSON.stringify(data),
      }),
    }),
    readBlogTag: builder.query({
      transformResponse: (data: any) => data,
      query: () => ({
        url: "admin/blog/tag",
        method: "GET",
      }),
    }),
    readBlogTagList: builder.query({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: `admin/blog/tag?page=${data.page}&pageSize=${data.pageSize}&tag=${data.tag}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateBlogTagMutation,
  useUpdateBlogTagByIdMutation,
  useDeleteBlogTagByIdsMutation,
  useReadBlogTagListQuery,
  useReadBlogTagQuery,
} = blogTag;
