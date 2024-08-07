import type * as tn from "@remix-run/node";

import { getAllBlog$ } from "~/dals/blog";
import { lastValueFrom } from "rxjs";

export async function query(args: tn.LoaderFunctionArgs) {
  return await lastValueFrom(getAllBlog$());
}
