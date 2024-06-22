import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dashboard = createApi({
  reducerPath: "dashboard",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getDashboard: builder.query({
      transformResponse: (data: any) => data?.data,
      query: () => ({ url: "dashboard" }),
    }),
  }),
});

export const { useGetDashboardQuery } = dashboard;
