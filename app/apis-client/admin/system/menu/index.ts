import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchQuery } from "@/apis-client/_base-query";

export const systemMenu = createApi({
  reducerPath: "menu",
  baseQuery: fetchQuery,
  endpoints: (builder) => ({
    createMenu: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/system/menu",
        method: "POST",
        body: JSON.stringify(data),
      }),
    }),
    updateMenuById: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/system/menu",
        method: "PUT",
        body: JSON.stringify(data),
      }),
    }),
    deleteMenuByIds: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/system/menu",
        method: "DELETE",
        body: JSON.stringify(data),
      }),
    }),
    readMenu: builder.query({
      transformResponse: (data: any) => data,
      query: () => ({
        url: "admin/system/menu",
        method: "GET",
      }),
    }),
    readMenuList: builder.query({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: `admin/system/menu?page=${data.page}&pageSize=${data.pageSize}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateMenuMutation,
  useUpdateMenuByIdMutation,
  useDeleteMenuByIdsMutation,
  useReadMenuListQuery,
  useReadMenuQuery,
} = systemMenu;
