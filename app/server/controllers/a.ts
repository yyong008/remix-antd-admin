// import type { ActionArgs } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";

// remix
import { redirect } from "@remix-run/node";

// rxjs
import {
  catchError,
  forkJoin,
  iif,
  lastValueFrom,
  map,
  of,
  switchMap,
  throwError,
} from "rxjs";

// config
import { langs } from "~/config/lang";

// utils
import { createT$ } from "~/utils/i18n.util";
import { respSuccessJson } from "~/server/utils/response.json";

// decorators
import { checkLogin } from "~/server/decorators/check-auth.decorator";

// servies
import { getUserInfoById$ } from "~/server/services/system/user";
import { getUserId$ } from "~/server/services/common/session";
import { getFlatMenuByUserId$ } from "~/server/services/system/user-perms.server";

export class LayoutAController {
  @checkLogin()
  static async loader({ request, params }: LoaderFunctionArgs) {
    const layout$ = of(params)
      .pipe(
        switchMap((params) =>
          iif(
            () =>
              langs.includes(
                typeof params.lang === "string" ? params.lang : "",
              ),
            of(true),
            throwError(() => {
              return () => redirect("/404");
            }),
          ),
        ),
      )
      .pipe(
        switchMap(() =>
          forkJoin([of(params), createT$(params), getUserId$(request)]),
        ),
        switchMap((data) =>
          forkJoin([
            getFlatMenuByUserId$(data[2]!),
            getUserInfoById$(data[2]!),
          ]),
        ),
        map(
          (data) => () =>
            respSuccessJson({
              menu: data[0],
              userInfo: data[1],
            }),
        ),
        catchError((e) => {
          return throwError(() => () => e());
        }),
      );

    const overFn = await lastValueFrom(layout$);
    return overFn();
  }
}