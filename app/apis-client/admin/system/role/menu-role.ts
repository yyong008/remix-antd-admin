import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchQuery } from "@/apis-client/_base-query";

export const systemMenuRole = createApi({
  reducerPath: "menuRole",
  baseQuery: fetchQuery,
  endpoints: (builder) => ({
    createMenuRole: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/system/menu/role",
        method: "POST",
        body: JSON.stringify(data),
      }),
    }),
    updateMenuRoleById: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/system/menu/role",
        method: "PUT",
        body: JSON.stringify(data),
      }),
    }),
    deleteMenuRoleByIds: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/system/menu/role",
        method: "DELETE",
        body: JSON.stringify(data),
      }),
    }),
    readMenuRole: builder.query({
      transformResponse: (data: any) => data,
      query: () => ({
        url: "admin/system/menu/role",
        method: "GET",
      }),
    }),
    readMenuRoleList: builder.query({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: `admin/system/menu/role?page=${data.page}&pageSize=${data.pageSize}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateMenuRoleMutation,
  useUpdateMenuRoleByIdMutation,
  useDeleteMenuRoleByIdsMutation,
  useReadMenuRoleListQuery,
  useReadMenuRoleQuery,
} = systemMenuRole;
