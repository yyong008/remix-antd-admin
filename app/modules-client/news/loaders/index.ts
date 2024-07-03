import type * as tn from "@remix-run/node";

import { getNews } from "~/dals/news/news";

export async function query(args: tn.LoaderFunctionArgs) {
  return await getNews();
}
