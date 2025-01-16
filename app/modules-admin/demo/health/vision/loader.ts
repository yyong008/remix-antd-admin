import { type LoaderFunction } from "react-router";
import { getVisionData$ } from "~/__mock__/health/vision";
import { lastValueFrom } from "rxjs";

export const loader: LoaderFunction = async () => {
  const data: any = await lastValueFrom(getVisionData$());
  return data;
};
