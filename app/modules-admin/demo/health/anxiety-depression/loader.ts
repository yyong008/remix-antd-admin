import type { LoaderFunction } from "@remix-run/node";
import { getDiseaseData$ } from "~/__mock__/health/anxiety-depression";
import { json } from "@remix-run/node";
import { lastValueFrom } from "rxjs";

export const loader: LoaderFunction = async () => {
  const data = await lastValueFrom(getDiseaseData$());
  return json(data);
};
