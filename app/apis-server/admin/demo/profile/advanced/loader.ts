import type { LoaderFunction, LoaderFunctionArgs } from "react-router";

import { getLoggers$ } from "~/__mock__/profile/profile.server";
import { lastValueFrom } from "rxjs";

export const loader: LoaderFunction = async ({
  request,
  params,
}: LoaderFunctionArgs) => {
  const data = await lastValueFrom(getLoggers$());
  return data;
};
