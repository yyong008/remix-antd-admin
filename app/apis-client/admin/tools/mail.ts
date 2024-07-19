import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchQuery } from "../../_base-query";

export const toolsMail = createApi({
  reducerPath: "toolsMail",
  baseQuery: fetchQuery,
  endpoints: (builder) => ({
    createMailTemplate: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/tools/mail",
        method: "POST",
        body: JSON.stringify(data),
      }),
    }),
    updateMailTemplateById: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/tools/mail",
        method: "PUT",
        body: JSON.stringify(data),
      }),
    }),
    deleteMailTemplateByIds: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "admin/tools/mail",
        method: "DELETE",
        body: JSON.stringify(data),
      }),
    }),
    readMailTemplate: builder.query({
      transformResponse: (data: any) => data,
      query: (id: number) => ({
        url: "admin/tools/mail/" + id,
        method: "GET",
      }),
    }),
    readMailTemplateList: builder.query({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: `admin/tools/mail?page=${data.page}&pageSize=${data.pageSize}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateMailTemplateMutation,
  useUpdateMailTemplateByIdMutation,
  useDeleteMailTemplateByIdsMutation,
  useReadMailTemplateListQuery,
  useReadMailTemplateQuery,
} = toolsMail;
