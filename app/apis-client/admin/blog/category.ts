import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchQuery } from "../../_base-query";

export const blogCategory = createApi({
  reducerPath: "blogCategory",
  baseQuery: fetchQuery,
  endpoints: (builder) => ({
    createBlogCategory: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/blog/category",
        method: "POST",
        body: JSON.stringify(data),
      }),
    }),
    updateBlogCategoryById: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/blog/category",
        method: "PUT",
        body: JSON.stringify(data),
      }),
    }),
    deleteBlogCategoryByIds: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/blog/category",
        method: "DELETE",
        body: JSON.stringify(data),
      }),
    }),
    readBlogCategory: builder.query({
      transformResponse: (data: any) => data,
      query: () => ({
        url: "admin/blog/category",
        method: "GET",
      }),
    }),
    readBlogCategoryList: builder.query({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: `admin/blog/category?page=${data.page}&pageSize=${data.pageSize}&category=${data.category}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateBlogCategoryMutation,
  useUpdateBlogCategoryByIdMutation,
  useDeleteBlogCategoryByIdsMutation,
  useReadBlogCategoryListQuery,
  useReadBlogCategoryQuery,
} = blogCategory;
