import type { LoaderFunction } from "@remix-run/node";
import { getObesityData$ } from "~/__mock__/health/obesity";
import { json } from "@remix-run/node";
import { lastValueFrom } from "rxjs";

export const loader: LoaderFunction = async () => {
  const data = await lastValueFrom(getObesityData$());
  return json(data);
};
