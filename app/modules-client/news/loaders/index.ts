import type * as tn from "@remix-run/node";

import { getNews$ } from "@/dals/news/news";
import { lastValueFrom } from "rxjs";

export async function query(args: tn.LoaderFunctionArgs) {
  return await lastValueFrom(getNews$());
}
