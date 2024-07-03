import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchQuery } from "../../_base-query";

export const blog = createApi({
  reducerPath: "blog",
  baseQuery: fetchQuery,
  endpoints: (builder) => ({
    createBlog: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/blog",
        method: "POST",
        body: JSON.stringify(data),
      }),
    }),
    updateBlogById: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/blog",
        method: "PUT",
        body: JSON.stringify(data),
      }),
    }),
    deleteBlogByIds: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/blog",
        method: "DELETE",
        body: JSON.stringify(data),
      }),
    }),
    readBlog: builder.query({
      transformResponse: (data: any) => data,
      query: ({ id }) => ({
        url: "admin/blog/" + id,
        method: "GET",
      }),
    }),
    readBlogList: builder.query({
      transformResponse: (data: any) => data,
      query: (data) => {
        let search = `?page=${data.page || 1}&pageSize=${data.pageSize || 10}`;
        if (data.tag) {
          search += `&tag=${data.tag}`;
        }
        if (data.category) {
          search += `&category=${data.category}`;
        }
        return {
          url: `admin/blog${search}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useCreateBlogMutation,
  useUpdateBlogByIdMutation,
  useDeleteBlogByIdsMutation,
  useReadBlogListQuery,
  useReadBlogQuery,
} = blog;
