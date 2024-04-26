// import type { ActionArgs } from "@remix-run/node";
import type * as rrn from "@remix-run/node";

// decorators
import * as ds from "~/server/decorators";

// remix
import { redirect } from "@remix-run/node";

// rxjs
import {
  map,
  of,
  iif,
  forkJoin,
  switchMap,
  catchError,
  throwError,
  lastValueFrom,
} from "rxjs";

// config
import { langs } from "~/config/lang";

// servies
import * as userServices from "~/server/services/system/user";
import * as sessionServices from "~/server/services/common/session";
import * as userPermsServices from "~/server/services/system/user-perms.server";

// utils
import * as serverUtils from "~/server/utils";

export class LayoutAController {
  @ds.Loader
  static async loader({ request, params }: rrn.LoaderFunctionArgs) {}

  @ds.checkLogin()
  static async get({ request, params }: rrn.LoaderFunctionArgs) {
    const higherOrderRedirect404 = () => {
      return () => redirect("/404");
    };
    const higherOrderThrowError = (e: () => any) => () => e();
    const LangInParams = () =>
      langs.includes(typeof params.lang === "string" ? params.lang : "");

    const result$ = of(params)
      .pipe(
        switchMap((params) =>
          iif(LangInParams, of(true), throwError(higherOrderRedirect404)),
        ),
      )
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
          return throwError(() => higherOrderThrowError(e));
        }),
      );

    const resultFn = await lastValueFrom(result$);
    return resultFn();
  }
}
