import type { LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";

import { getLoggers$ } from "~/__mock__/profile/profile.server";
import { json } from "@remix-run/node";
import { lastValueFrom } from "rxjs";

export const loader: LoaderFunction = async ({
  request,
  params,
}: LoaderFunctionArgs) => {
  const data = await lastValueFrom(getLoggers$());
  return json(data);
};
