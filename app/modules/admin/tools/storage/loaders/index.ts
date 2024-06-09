import type * as rrn from "@remix-run/node";
import * as toolsStorageServices from "~/services/tools/storage";

import { from, lastValueFrom, switchMap } from "rxjs";

export async function query(args: rrn.LoaderFunctionArgs) {
  const result$ = from(args.request.json()).pipe(
    switchMap((ids: number[]) => toolsStorageServices.getStorageList$({})),
  );

  return await lastValueFrom(result$);
}
