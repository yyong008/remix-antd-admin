import { type LoaderFunctionArgs } from "@remix-run/node";
import { createApi } from "~/utils/server/api/api-handler";
import { query as userQuery } from "./loaders";

export const apiUserHandler = await createApi(
  {
    isPublic: false,
    perm: "",
  },
  userQuery,
);

export const loader = (args: LoaderFunctionArgs) => {
  return apiUserHandler(args);
};
