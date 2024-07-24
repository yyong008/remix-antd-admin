import type { LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";

import { getBasicList$ } from "~/__mock__/list/basic.list";
import { json } from "@remix-run/node";
import { lastValueFrom } from "rxjs";

export const loader: LoaderFunction = async ({
  request,
  params,
}: LoaderFunctionArgs) => {
  const data = await lastValueFrom(getBasicList$());

  return json(data.dataSource);
};
