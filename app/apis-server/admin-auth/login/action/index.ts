import { type ActionFunctionArgs } from "@remix-run/node";
import { apiLoginHandler } from "~/services/admin-auth/login";

export const action = async (args: ActionFunctionArgs) => {
  return apiLoginHandler(args);
};
