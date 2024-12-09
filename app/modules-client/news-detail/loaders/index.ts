import type * as tn from "@remix-run/node";

import { getNewsById$ } from "~/dals/news/NewsDAL";
import { lastValueFrom } from "rxjs";

export async function query(args: tn.LoaderFunctionArgs) {
  return await lastValueFrom(getNewsById$(Number(args.params.id!)));
}
