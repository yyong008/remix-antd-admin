import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchQuery } from "../../_base-query";

export const profileLink = createApi({
  reducerPath: "link",
  baseQuery: fetchQuery,
  endpoints: (builder) => ({
    createProfileLink: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/profile/link",
        method: "POST",
        body: JSON.stringify(data),
      }),
    }),
    updateProfileLinkById: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/profile/link",
        method: "PUT",
        body: JSON.stringify(data),
      }),
    }),
    deleteProfileLinkByIds: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/profile/link",
        method: "DELETE",
        body: JSON.stringify(data),
      }),
    }),
    readProfileLink: builder.query({
      transformResponse: (data: any) => data,
      query: () => ({
        url: "admin/profile/link",
        method: "GET",
      }),
    }),
    readProfileLinkList: builder.query({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: `admin/profile/link?category=${data.id}&page=${data.page}&pageSize=${data.pageSize}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateProfileLinkMutation,
  useUpdateProfileLinkByIdMutation,
  useDeleteProfileLinkByIdsMutation,
  useReadProfileLinkListQuery,
  useReadProfileLinkQuery,
} = profileLink;
