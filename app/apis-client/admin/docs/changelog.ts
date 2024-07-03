import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchQuery } from "../../_base-query";

export const changelog = createApi({
  reducerPath: "changelog",
  baseQuery: fetchQuery,
  endpoints: (builder) => ({
    createChangelog: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "changelog",
        method: "POST",
        body: JSON.stringify(data),
      }),
    }),
    updateChangelogById: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "changelog",
        method: "PUT",
        body: JSON.stringify(data),
      }),
    }),
    deleteChangelogByIds: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "changelog",
        method: "DELETE",
        body: JSON.stringify(data),
      }),
    }),
    readChangelog: builder.query({
      transformResponse: (data: any) => data,
      query: () => ({
        url: "changelog",
        method: "GET",
      }),
    }),
    readChangelogList: builder.query({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: `changelog?page=${data.page}&pageSize=${data.pageSize}`,
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
