import type { LoaderFunctionArgs } from "@remix-run/node";
import { getAnalysisData$ } from "~/__mock__/dashboard/analysis";
import { lastValueFrom } from "rxjs";

export async function query({ request, params }: LoaderFunctionArgs) {
  const result = await lastValueFrom(getAnalysisData$());
  return result;
}
