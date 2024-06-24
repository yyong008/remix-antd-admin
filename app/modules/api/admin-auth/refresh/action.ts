import { type ActionFunctionArgs } from "@remix-run/node";
import { apiRefreshHandler } from "./refresh-action";

export const action = async (args: ActionFunctionArgs) => {
  return apiRefreshHandler(args);
};
