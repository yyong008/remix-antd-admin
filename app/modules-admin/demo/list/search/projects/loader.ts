import type { LoaderFunction, LoaderFunctionArgs } from "react-router";

import { getSearchApplicationCardList$ } from "~/__mock__/list/search.applications";
import { lastValueFrom } from "rxjs";

export const loader: LoaderFunction = async ({
  request,
  params,
}: LoaderFunctionArgs) => {
  const data = await lastValueFrom(getSearchApplicationCardList$());
  return data;
};
