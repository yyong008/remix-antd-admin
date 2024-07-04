import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchQuery } from "@/apis-client/_base-query";

export const systemMailTpl = createApi({
  reducerPath: "mailTpl",
  baseQuery: fetchQuery,
  endpoints: (builder) => ({
    createMailTpl: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/system/mail/tpl",
        method: "POST",
        body: JSON.stringify(data),
      }),
    }),
    updateMailTplById: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/system/mail/tpl",
        method: "PUT",
        body: JSON.stringify(data),
      }),
    }),
    deleteMailTplByIds: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/system/mail/tpl",
        method: "DELETE",
        body: JSON.stringify(data),
      }),
    }),
    readMailTpl: builder.query({
      transformResponse: (data: any) => data,
      query: () => ({
        url: "admin/system/mail/tpl",
        method: "GET",
      }),
    }),
    readMailTplList: builder.query({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: `admin/system/mail/tpl?page=${data.page}&pageSize=${data.pageSize}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateMailTplMutation,
  useUpdateMailTplByIdMutation,
  useDeleteMailTplByIdsMutation,
  useReadMailTplListQuery,
  useReadMailTplQuery,
} = systemMailTpl;
