import type * as tn from "@remix-run/node";

import { getBlogById$ } from "~/dals/blog/BlogDAL";
import { lastValueFrom } from "rxjs";

export async function blogDetail(args: tn.LoaderFunctionArgs) {
  return await lastValueFrom(getBlogById$(Number(args.params.id!)));
}
