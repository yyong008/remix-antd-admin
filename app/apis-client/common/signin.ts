import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchQuery } from "../_base-query";

export const signIn = createApi({
  reducerPath: "signIn",
  baseQuery: fetchQuery,
  endpoints: (builder) => ({
    signIn: builder.mutation({
      transformResponse: (data: any) => data,
      query: () => ({
        url: "signin",
        method: "POST",
      }),
    }),
  }),
});

export const { useSignInMutation } = signIn;
