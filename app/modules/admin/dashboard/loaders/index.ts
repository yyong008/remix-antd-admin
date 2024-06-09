import * as loginLogServices from "~/services/system/login-log";
import type * as rrn from "@remix-run/node";
import * as sessionServices from "~/lib/session";
import * as singInLog from "~/services/sign-in/signInLog";

import { forkJoin, from, lastValueFrom, switchMap } from "rxjs";

export async function query(args: rrn.LoaderFunctionArgs) {
  const result$ = from(sessionServices.getUserId$(args.request)).pipe(
    switchMap((userId) =>
      forkJoin({
        isLogin: singInLog.getUserTodayIsSignInById$(userId!),
        latestLoginLog: loginLogServices.getLoginLogLatestByUserId(userId!),
      }),
    ),
  );

  return await lastValueFrom(result$);
}
