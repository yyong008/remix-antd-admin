import type { LoaderFunction } from "react-router";
import { getSleepData$ } from "~/__mock__/health/sleep";
import { lastValueFrom } from "rxjs";

export const loader: LoaderFunction = async () => {
  const data = await lastValueFrom(getSleepData$());
  return data;
};
