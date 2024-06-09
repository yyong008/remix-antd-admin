import type * as rrn from "@remix-run/node";
import * as toolsStorageServices from "~/services/tools/storage";

import { from, lastValueFrom, switchMap } from "rxjs";

export async function deleteStorageByIds(args: rrn.ActionFunctionArgs) {
  const result$ = from(args.request.json()).pipe(
    switchMap((ids: number[]) => toolsStorageServices.deleteStorageByIds$(ids)),
  );
  return await lastValueFrom(result$);
}
