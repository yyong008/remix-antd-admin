import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchQuery } from "../../_base-query";

export const changelog = createApi({
  reducerPath: "changelog",
  baseQuery: fetchQuery,
  endpoints: (builder) => ({
    createChangelog: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/docs/changelog",
        method: "POST",
        body: JSON.stringify(data),
      }),
    }),
    updateChangelogById: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/docs/changelog",
        method: "PUT",
        body: JSON.stringify(data),
      }),
    }),
    deleteChangelogByIds: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/docs/changelog",
        method: "DELETE",
        body: JSON.stringify(data),
      }),
    }),
    readChangelog: builder.query({
      transformResponse: (data: any) => data,
      query: () => ({
        url: "admin/docs/changelog",
        method: "GET",
      }),
    }),
    readChangelogList: builder.query({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: `admin/docs/changelog?page=${data.page ?? 1}&pageSize=${data.pageSize ?? 10}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateChangelogMutation,
  useUpdateChangelogByIdMutation,
  useDeleteChangelogByIdsMutation,
  useReadChangelogListQuery,
  useReadChangelogQuery,
} = changelog;
