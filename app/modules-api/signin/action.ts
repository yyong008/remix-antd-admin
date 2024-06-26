import { type LoaderFunctionArgs } from "@remix-run/node";
import { createApiHandler } from "~/utils/server/api-handler";
import { signInAction } from "./signin-action";

export const apiUserHandler = await createApiHandler(
  {
    isPublic: false,
    perm: "",
  },
  signInAction,
);

export const action = (args: LoaderFunctionArgs) => {
  return apiUserHandler(args);
};
