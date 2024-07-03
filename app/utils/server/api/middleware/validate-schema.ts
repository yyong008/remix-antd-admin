import {
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
} from "@remix-run/node";
import { type z } from "zod";

type TT = ActionFunctionArgs | LoaderFunctionArgs;

export async function handlerSchema(args: TT, schema: z.ZodSchema) {
  const dto = await args.request.clone().json();
  const result = schema.safeParse(dto);
  if (!result.success) {
    throw new Error(result.error.errors[0].message);
  }
}
