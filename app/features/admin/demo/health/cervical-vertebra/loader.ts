import type { LoaderFunction } from "@remix-run/node";
import { getCervicalData$ } from "~/__mock__/health/cervical-vertebra";
import { json } from "@remix-run/node";
import { lastValueFrom } from "rxjs";

export const loader: LoaderFunction = async () => {
  const data = await lastValueFrom(getCervicalData$());
  return json(data);
};
