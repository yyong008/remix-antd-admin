import { type ActionFunctionArgs } from "@remix-run/node";
import { apiLoginHandler } from "./login-action";

export const action = async (args: ActionFunctionArgs) => {
  return apiLoginHandler(args);
};
