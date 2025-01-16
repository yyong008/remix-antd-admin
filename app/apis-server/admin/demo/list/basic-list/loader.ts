import type { LoaderFunction, LoaderFunctionArgs } from "react-router";

import { getBasicList$ } from "~/__mock__/list/basic.list";
import { lastValueFrom } from "rxjs";

export const loader: LoaderFunction = async ({
  request,
  params,
}: LoaderFunctionArgs) => {
  const data = await lastValueFrom(getBasicList$());

  return data.dataSource;
};
