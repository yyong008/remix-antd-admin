import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchQuery } from "../_base-query";

export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "login",
        method: "POST",
        body: JSON.stringify(data),
        keepUnusedDataFor: 0,
      }),
    }),
    register: builder.mutation({
      transformResponse: (data: any) => data,
      query: (data) => ({
        url: "register",
        method: "POST",
        body: JSON.stringify(data),
        keepUnusedDataFor: 0,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
