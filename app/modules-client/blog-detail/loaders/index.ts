import type * as tn from "react-router";

import { getBlogById$ } from "~/dals/blog/BlogDAL";
import { lastValueFrom } from "rxjs";

export async function blogDetail(args: tn.LoaderFunctionArgs) {
  return await lastValueFrom(getBlogById$(Number(args.params.id!)));
}
