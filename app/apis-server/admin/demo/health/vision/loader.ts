import { json, type LoaderFunction } from "@remix-run/node";
import { getVisionData$ } from "~/__mock__/health/vision";
import { lastValueFrom } from "rxjs";

export const loader: LoaderFunction = async () => {
  const data: any = await lastValueFrom(getVisionData$());
  return json(data);
};
