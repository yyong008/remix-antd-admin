import type * as tn from "@remix-run/node";

import { getBlogById$ } from "~/services/blog/blog";
import { lastValueFrom } from "rxjs";

export async function query(args: tn.LoaderFunctionArgs) {
  return await lastValueFrom(getBlogById$(Number(args.params.id!)));
}
