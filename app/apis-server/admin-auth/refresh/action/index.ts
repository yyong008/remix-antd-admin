import { type ActionFunctionArgs } from "@remix-run/node";
import { apiRefreshHandler } from "@/services/admin-auth/refresh";

export const action = async (args: ActionFunctionArgs) => {
  return apiRefreshHandler(args);
};
