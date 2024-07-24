import { type LoaderFunctionArgs } from "@remix-run/node";
import { createApi } from "~/utils/server/api/api-handler";
import { query as centerQuery } from "./query";

export const apiDashboardHandler = await createApi(
  {
    isPublic: false,
    perm: "",
  },
  centerQuery,
);

export const loader = (args: LoaderFunctionArgs) => {
  return apiDashboardHandler(args);
};
