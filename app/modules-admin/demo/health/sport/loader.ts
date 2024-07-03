import type { LoaderFunction } from "@remix-run/node";
import { getSportData$ } from "~/__mock__/health/sport";
import { json } from "@remix-run/node";
import { lastValueFrom } from "rxjs";

export const loader: LoaderFunction = async () => {
  const data = await lastValueFrom(getSportData$());
  return json(data);
};
