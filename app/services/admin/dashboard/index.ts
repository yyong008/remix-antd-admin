import { forkJoin, from, lastValueFrom, switchMap } from "rxjs";

import { getTokenUserIdByArgs } from "~/libs/jose";
import { type LoaderFunctionArgs } from "@remix-run/node";
import { getUserTodayIsSignInById$ } from "~/dals/sign-in/signInLog";
import { getLoginLogLatestByUserId } from "~/dals/system/login-log";

export async function dashboardServices(args: LoaderFunctionArgs) {
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
