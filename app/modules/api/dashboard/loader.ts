import { type LoaderFunctionArgs } from "@remix-run/node";
import { createApiHandler } from "~/utils/server/api-handler";
import { query as dashboardQuery } from "./loaders";

export const apiDashboardHandler = await createApiHandler(
  {
    isPublic: false,
    perm: "",
  },
  dashboardQuery,
);

export const loader = (args: LoaderFunctionArgs) => {
  return apiDashboardHandler(args);
};
