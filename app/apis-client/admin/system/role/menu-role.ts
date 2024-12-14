import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchQuery } from "@/apis-client/_base-query";

export const systemMenuRoleApi = createApi({
  reducerPath: "menuRole",
  baseQuery: fetchQuery,
  endpoints: (builder) => ({
    readRoleAll: builder.query({
      transformResponse: (data: any) => data,
      query: () => ({
        url: `admin/system/menu-role`,
        method: "GET",
      }),
    }),
  }),
});
