import { forkJoin, from, lastValueFrom, switchMap } from "rxjs";

import { getTokenUserIdByArgs } from "~/lib/jose";
import { type LoaderFunctionArgs } from "@remix-run/node";
import { getUserTodayIsSignInById$ } from "~/services/sign-in/signInLog";
import { getLoginLogLatestByUserId } from "~/services/system/login-log";

export async function query(args: LoaderFunctionArgs) {
  const result$ = from(getTokenUserIdByArgs(args)).pipe(
    switchMap((data: any) =>
      forkJoin({
        isLogin: getUserTodayIsSignInById$(data?.userId),
        latestLoginLog: getLoginLogLatestByUserId(data?.userId),
      }),
    ),
  );

  return await lastValueFrom(result$);
}
