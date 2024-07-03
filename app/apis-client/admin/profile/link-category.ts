import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchQuery } from "../../_base-query";

export const profileLinkCategory = createApi({
  reducerPath: "linkCategory",
  baseQuery: fetchQuery,
  endpoints: (builder) => ({
    createProfileLinkCategory: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "profile/link/category",
        method: "POST",
        body: JSON.stringify(data),
      }),
    }),
    updateProfileLinkCategoryById: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "profile/link/category",
        method: "PUT",
        body: JSON.stringify(data),
      }),
    }),
    deleteProfileLinkCategoryByIds: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "profile/link/category",
        method: "DELETE",
        body: JSON.stringify(data),
      }),
    }),
    readProfileLinkCategory: builder.query({
      transformResponse: (data: any) => data,
      query: () => ({
        url: "profile/link/category",
        method: "GET",
      }),
    }),
    readProfileLinkCategoryList: builder.query({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: `profile/link/category?page=${data.page}&pageSize=${data.pageSize}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateProfileLinkCategoryMutation,
  useUpdateProfileLinkCategoryByIdMutation,
  useDeleteProfileLinkCategoryByIdsMutation,
  useReadProfileLinkCategoryListQuery,
  useReadProfileLinkCategoryQuery,
} = profileLinkCategory;
