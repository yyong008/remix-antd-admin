import { type z } from "zod";
import type { ALFunctionArgs } from "@/types/remix";

type UrlAndBodySchemas = {
  url?: z.ZodSchema;
  body?: z.ZodSchema;
};

export async function handlerSchema(
  args: ALFunctionArgs,
  schemas: UrlAndBodySchemas,
) {
  if (schemas.url) {
    const url_result = schemas.url?.safeParse(args.request.url);
    if (!url_result.success) {
      throw new Error(url_result.error.errors[0].message);
    }
  }
  if (schemas.body) {
    const dto = await args.request.clone().json();
    const result = schemas.body?.safeParse(dto);
    if (!result.success) {
      throw new Error(result.error.errors[0].message);
    }
  }
}
