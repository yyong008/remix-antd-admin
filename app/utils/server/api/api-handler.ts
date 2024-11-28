import { rfj, rsj } from "~/utils/server";
import { type z } from "zod";
import { handlerPerm } from "./middleware/permission";
import { handlerPresentationMode } from "./middleware/presentation-mode";
import { handlerSchema } from "./middleware/validate-schema";
import { handlerAuth } from "./middleware/auth";
import type { ALFunctionArgs } from "@/types/remix";

type TOption = {
  isPublic?: boolean;
  perm?: string;
  schemas?: {
    url?: z.Schema;
    body?: z.Schema;
  };
};

export async function createApi(
  options: TOption,
  fn: (ags: ALFunctionArgs) => Promise<any>,
) {
  return async function apiHandler(args: ALFunctionArgs) {
    let data = {};
    try {
      if (!options.isPublic) {
        await handlerAuth(args);
        await handlerPresentationMode(args);
      }
      if (options.perm) {
        await handlerPerm(args, options.perm);
      }

      if (options.schemas) {
        await handlerSchema(args, options.schemas);
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
