import type { LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";

import { getSearchProjectCardList$ } from "~/__mock__/list/search.projects";
import { json } from "@remix-run/node";
import { lastValueFrom } from "rxjs";

export const loader: LoaderFunction = async ({
  request,
  params,
}: LoaderFunctionArgs) => {
  const _data = await lastValueFrom(getSearchProjectCardList$());
  return json({ data: _data });
};
