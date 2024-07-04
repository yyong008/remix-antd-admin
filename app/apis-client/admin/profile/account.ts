import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchQuery } from "../../_base-query";

export const profileAccount = createApi({
  reducerPath: "profileAccount",
  baseQuery: fetchQuery,
  endpoints: (builder) => ({
    createProfileAccount: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/profile/account",
        method: "POST",
        body: JSON.stringify(data),
      }),
    }),
    updateProfileAccountById: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/profile/account",
        method: "PUT",
        body: JSON.stringify(data),
      }),
    }),
    deleteProfileAccountByIds: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/profile/account",
        method: "DELETE",
        body: JSON.stringify(data),
      }),
    }),
    readProfileAccount: builder.query({
      transformResponse: (data: any) => data,
      query: () => ({
        url: "admin/profile/account",
        method: "GET",
      }),
    }),
    readProfileAccountList: builder.query({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: `admin/profile/account?page=${data.page}&pageSize=${data.pageSize}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateProfileAccountMutation,
  useUpdateProfileAccountByIdMutation,
  useDeleteProfileAccountByIdsMutation,
  useReadProfileAccountListQuery,
  useReadProfileAccountQuery,
} = profileAccount;
