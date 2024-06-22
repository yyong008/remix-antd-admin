import type * as rrn from "@remix-run/node";
import * as serverUtils from "~/utils/server";
import * as sessionServices from "~/lib/session";
import * as userPermsServices from "~/services/system/user-perms.server";
import * as userServices from "~/services/system/user";

import {
  catchError,
  forkJoin,
  lastValueFrom,
  map,
  of,
  switchMap,
  throwError,
} from "rxjs";

// import { langs } from "~/config/lang";
// import { redirect } from "@remix-run/node";

export async function query({ request, params }: rrn.LoaderFunctionArgs) {
  // const higherOrderRedirect404 = () => {
  //   return () => redirect("/404");
  // };
  const higherOrderThrowError = (e: () => any) => () => e();
  // const LangInParams = () =>
  //   langs.includes(typeof params.lang === "string" ? params.lang : "");

  const result$ = of(params)
    // .pipe(
    //   switchMap((params) =>
    //     iif(LangInParams, of(true), throwError(higherOrderRedirect404)),
    //   ),
    // )
    .pipe(
      switchMap(() => sessionServices.getUserId$(request)),
      switchMap((data) =>
        forkJoin({
          menu: userPermsServices.getFlatMenuByUserId$(data!),
          userInfo: userServices.getUserInfoById$(data!),
        }),
      ),
      map((data) => () => {
        return serverUtils.resp$(of(data));
      }),
      catchError((e) => {
        console.log(e);
        return throwError(() => higherOrderThrowError(e));
      }),
    );

  const resultFn = await lastValueFrom(result$);
  return resultFn();
}
