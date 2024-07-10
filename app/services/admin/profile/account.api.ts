import { from, lastValueFrom, map, switchMap } from "rxjs";

import { type LoaderFunctionArgs } from "@remix-run/node";
import { getAccountById$ } from "@/dals/profile/account";
import { getTokenUserIdByArgs } from "@/libs/jose";

export async function readAccountInfoService(args: LoaderFunctionArgs) {
  const result$ = from(getTokenUserIdByArgs(args))
    .pipe(map((payload) => payload.userId))
    .pipe(switchMap((id: number) => getAccountById$(id)));

  const result = await lastValueFrom(result$);
  return result;
}
