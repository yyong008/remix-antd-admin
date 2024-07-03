import { type LoaderFunctionArgs } from "@remix-run/node";
import { createApi } from "~/utils/server/api/api-handler";

import { dashboardServices } from "@/services/admin/dashboard";

export const apiDashboardHandler = await createApi(
  {
    isPublic: false,
    perm: "",
  },
  dashboardServices,
);

export const loader = async (args: LoaderFunctionArgs) => {
  return await apiDashboardHandler(args);
};
