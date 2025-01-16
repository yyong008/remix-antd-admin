import type { LoaderFunction } from "react-router";
import { getSportData$ } from "~/__mock__/health/sport";
import { lastValueFrom } from "rxjs";

export const loader: LoaderFunction = async () => {
  const data = await lastValueFrom(getSportData$());
  return data;
};
