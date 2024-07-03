import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchQuery } from "../../_base-query";

export const dashboard = createApi({
  reducerPath: "dashboard",
  baseQuery: fetchQuery,
  endpoints: (builder) => ({
    getDashboard: builder.query({
      transformResponse: (data: any) => data?.data,
      query: () => ({ url: "dashboard", headers: {} }),
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useGetDashboardQuery } = dashboard;
