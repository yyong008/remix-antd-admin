import { rfj, rsj } from "~/utils/server";

import {
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
} from "@remix-run/node";
import { type z } from "zod";
import { handlerPerm } from "./middleware/permission";
import { handlerPresentationMode } from "./middleware/presentation-mode";
import { handlerSchema } from "./middleware/validate-schema";
import { handlerAuth } from "./middleware/auth";

type TT = ActionFunctionArgs | LoaderFunctionArgs;
type TOption = {
  isPublic?: boolean;
  perm?: string;
  schema?: z.ZodSchema;
};

export async function createApi(
  options: TOption,
  fn: (ags: TT) => Promise<any>,
) {
  return async function apiHandler(args: TT) {
    let data = {};
    try {
      if (!options.isPublic) {
        await handlerAuth(args);
        await handlerPresentationMode(args);
      }
      if (options.perm) {
        await handlerPerm(args, options.perm);
      }

      if (options.schema) {
        await handlerSchema(args, options.schema);
      }
      data = await fn(args);
      return rsj(data);
    } catch (error) {
      console.error("❌ >>", error);
      if (error instanceof Error) {
        return rfj(data, error?.message);
      }
      if (typeof error === "string") {
        return rfj(data, error);
      }
      return rfj(data, error?.toString());
    }
  };
}
