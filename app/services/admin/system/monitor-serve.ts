import type * as rrn from "@remix-run/node";

import { getSystemInfo$ } from "@/libs/systemInfo";
import { lastValueFrom } from "rxjs";

export const readMonitorServeListService = async (
  args: rrn.LoaderFunctionArgs,
) => {
  const result$ = getSystemInfo$();

  const data = await lastValueFrom(result$);
  console.log("data", data);
  return data;
};
