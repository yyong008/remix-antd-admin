import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchQuery } from "@/apis-client/_base-query";

export const systemRole = createApi({
  reducerPath: "role",
  baseQuery: fetchQuery,
  endpoints: (builder) => ({
    createRole: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/system/role",
        method: "POST",
        body: JSON.stringify(data),
      }),
    }),
    updateRoleById: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/system/role",
        method: "PUT",
        body: JSON.stringify(data),
      }),
    }),
    deleteRoleByIds: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/system/role",
        method: "DELETE",
        body: JSON.stringify(data),
      }),
    }),
    readRole: builder.query({
      transformResponse: (data: any) => data,
      query: () => ({
        url: "admin/system/role",
        method: "GET",
      }),
    }),
    readRoleList: builder.query({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: `admin/system/role?page=${data.page}&pageSize=${data.pageSize}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateRoleMutation,
  useUpdateRoleByIdMutation,
  useDeleteRoleByIdsMutation,
  useReadRoleListQuery,
  useReadRoleQuery,
} = systemRole;
