import type { LoaderFunction } from "@remix-run/node";
import { getSleepData$ } from "~/__mock__/health/sleep";
import { json } from "@remix-run/node";
import { lastValueFrom } from "rxjs";

export const loader: LoaderFunction = async () => {
  const data = await lastValueFrom(getSleepData$());
  return json(data);
};
