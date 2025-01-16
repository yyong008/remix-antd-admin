import type { LoaderFunction } from "react-router";
import { getObesityData$ } from "~/__mock__/health/obesity";
import { lastValueFrom } from "rxjs";

export const loader: LoaderFunction = async () => {
  const data = await lastValueFrom(getObesityData$());
  return data;
};
