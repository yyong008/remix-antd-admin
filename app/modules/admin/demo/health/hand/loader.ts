import type { LoaderFunction } from "@remix-run/node";
import { gethandData$ } from "~/__mock__/health/hand";
import { json } from "@remix-run/node";
import { lastValueFrom } from "rxjs";

export const loader: LoaderFunction = async () => {
  const data = await lastValueFrom(gethandData$());
  return json(data);
};
