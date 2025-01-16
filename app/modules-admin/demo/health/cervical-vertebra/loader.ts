import type { LoaderFunction } from "react-router";
import { getCervicalData$ } from "~/__mock__/health/cervical-vertebra";
import { lastValueFrom } from "rxjs";

export const loader: LoaderFunction = async () => {
  const data = await lastValueFrom(getCervicalData$());
  return data;
};
