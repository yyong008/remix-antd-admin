import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchQuery } from "@/apis-client/_base-query";

export const systemUser = createApi({
  reducerPath: "user",
  baseQuery: fetchQuery,
  endpoints: (builder) => ({
    createUser: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/system/user",
        method: "POST",
        body: JSON.stringify(data),
      }),
    }),
    updateUserById: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/system/user",
        method: "PUT",
        body: JSON.stringify(data),
      }),
    }),
    deleteUserByIds: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/system/user",
        method: "DELETE",
        body: JSON.stringify(data),
      }),
    }),
    readUser: builder.query({
      transformResponse: (data: any) => data,
      query: () => ({
        url: "admin/system/user",
        method: "GET",
      }),
    }),
    readUserList: builder.query({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: `admin/system/user?page=${data.page}&pageSize=${data.pageSize}&name=${data.name ?? ""}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useUpdateUserByIdMutation,
  useDeleteUserByIdsMutation,
  useReadUserListQuery,
  useReadUserQuery,
} = systemUser;
