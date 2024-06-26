import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchQuery } from "../basequery";

export const auth = createApi({
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
  }),
});

export const { useLoginMutation } = auth;
