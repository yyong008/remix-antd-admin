import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchQuery } from "../../_base-query";

export const feedback = createApi({
  reducerPath: "feedback",
  baseQuery: fetchQuery,
  endpoints: (builder) => ({
    createFeedback: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "feedback",
        method: "POST",
        body: JSON.stringify(data),
      }),
    }),
    updateFeedbackById: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "feedback",
        method: "PUT",
        body: JSON.stringify(data),
      }),
    }),
    deleteFeedbackByIds: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "feedback",
        method: "DELETE",
        body: JSON.stringify(data),
      }),
    }),
    readFeedback: builder.query({
      transformResponse: (data: any) => data,
      query: () => ({
        url: "feedback",
        method: "GET",
      }),
    }),
    readFeedbackList: builder.query({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: `feedback?page=${data.page}&pageSize=${data.pageSize}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateFeedbackMutation,
  useUpdateFeedbackByIdMutation,
  useDeleteFeedbackByIdsMutation,
  useReadFeedbackListQuery,
  useReadFeedbackQuery,
} = feedback;
