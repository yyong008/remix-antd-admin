import type { LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";

import { getSearchApplicationCardList$ } from "~/__mock__/list/search.applications";
import { json } from "@remix-run/node";
import { lastValueFrom } from "rxjs";

export const loader: LoaderFunction = async ({
  request,
  params,
}: LoaderFunctionArgs) => {
  const data = await lastValueFrom(getSearchApplicationCardList$());
  return json(data);
};
