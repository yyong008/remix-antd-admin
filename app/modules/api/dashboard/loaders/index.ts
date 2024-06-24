import { forkJoin, from, lastValueFrom, switchMap } from "rxjs";

import { getTokenUserId } from "~/lib/jose";
import { type LoaderFunctionArgs } from "@remix-run/node";
import { getUserTodayIsSignInById$ } from "~/services/sign-in/signInLog";
import { getLoginLogLatestByUserId } from "~/services/system/login-log";

export async function query(args: LoaderFunctionArgs) {
  const result$ = from(getTokenUserId(args)).pipe(
    switchMap((userId) =>
      forkJoin({
        isLogin: getUserTodayIsSignInById$(userId!),
        latestLoginLog: getLoginLogLatestByUserId(userId!),
      }),
    ),
  );

  return await lastValueFrom(result$);
}
