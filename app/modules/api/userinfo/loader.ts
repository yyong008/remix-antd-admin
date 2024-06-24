import { type LoaderFunctionArgs } from "@remix-run/node";
import { createApiHandler } from "~/utils/server/api-handler";
import { query as userQuery } from "./loaders";

export const apiUserHandler = await createApiHandler(
  {
    isPublic: false,
    perm: "",
  },
  userQuery,
);

export const loader = (args: LoaderFunctionArgs) => {
  return apiUserHandler(args);
};
