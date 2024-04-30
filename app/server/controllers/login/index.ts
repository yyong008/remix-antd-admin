// types
import type * as rrn from "@remix-run/node";

//remix
import { redirect } from "@remix-run/node";

// rxjs
import {
  catchError,
  tap,
  defaultIfEmpty,
  forkJoin,
  from,
  iif,
  lastValueFrom,
  map,
  of,
  switchMap,
  throwError,
} from "rxjs";

import { defaultLang } from "~/config/lang";

// utils
import * as serverUtils from "~/server/utils";

// decorators
import * as ds from "~/server/decorators";

// schemas
import * as schemas from "~/schema";

// server
import * as sessionServices from "~/server/services/common/session";
import * as loginServices from "~/server/services/login";
import * as LoginLogServices from "../../services/system/login-log";

// constants
import * as errorTypeConstants from "~/server/constants/error.type";

export class LoginController {
  @ds.Loader
  static async loader({ request, params }: rrn.LoaderFunctionArgs) {}

  @ds.Action
  static async action({ request, params }: rrn.ActionFunctionArgs) {}

  static async get() {
    return serverUtils.respSuccessJson({});
  }

  @ds.validate(schemas.LoginSchema)
  static async post({ request, params }: rrn.ActionFunctionArgs) {
    const session$ = from(
      sessionServices.getSession(request.headers.get("Cookie")),
    );
    const lang$ = of(params?.lang).pipe(defaultIfEmpty(defaultLang));
    const dataDto$ = from(request.json());

    const crreateErrorHandle = (message?: string) => () => {
      return serverUtils.respFailJson(
        {},
        message ?? errorTypeConstants.ERROR_USER_OR_PASSWORD,
      );
    };
    const redirectToDashboard =
      (url: string, cookie: string, lang: string) => () => {
        return redirect(`/${lang}/admin/dashboard`, {
          headers: {
            "Set-Cookie": cookie,
          },
        });
      };

    const user$ = dataDto$.pipe(
      switchMap((dataDto) => loginServices.findByUserName$(dataDto.username)),
      catchError((e) =>
        throwError(
          crreateErrorHandle(e ?? errorTypeConstants.ERROR_UNREGISTER),
        ),
      ),
    );

    const result$ = forkJoin({
      dataDto: dataDto$,
      user: user$,
      session: session$,
    })
      .pipe(
        switchMap(({ dataDto, user, session }) => {
          return iif(
            () => dataDto === null,
            from([]).pipe(
              switchMap(() => {
                session.flash("error", errorTypeConstants.ERROR_PASSWWORD);
                return throwError(
                  crreateErrorHandle(errorTypeConstants.ERROR_PASSWWORD),
                );
              }),
            ),
            of({ dataDto, user }).pipe(
              tap(() => {
                session.set("userId", String(user!.id));
              }),
            ),
          );
        }),
        map(({ dataDto, user }) => ({
          user,
          passwordMatch: serverUtils.comparePassword(
            dataDto.password,
            user!.password,
          ),
        })),
        switchMap(({ user, passwordMatch }) => {
          return iif(
            () => passwordMatch,
            of(user),
            throwError(() =>
              crreateErrorHandle(errorTypeConstants.ERROR_PASSWWORD),
            ),
          );
        }),
        switchMap((user) => {
          return iif(
            () => user!.status === 1,
            of(user),
            throwError(() =>
              crreateErrorHandle(errorTypeConstants.ERRIR_USER_DISABLED),
            ),
          );
        }),
        switchMap((user) =>
          from(serverUtils.getLoginInfo(request)).pipe(
            switchMap((loginLog) =>
              from(
                LoginLogServices.createLoginLog({
                  ...loginLog,
                  name: user!.name,
                  userId: user!.id,
                }),
              ),
            ),
            switchMap(() => of(user)),
          ),
        ),
      )
      .pipe(
        switchMap(() => lang$),
        map((lang) => `/${lang}/admin/dashboard`),
      )
      .pipe(
        switchMap((url) =>
          from(session$).pipe(
            switchMap((session) =>
              forkJoin({
                url: of(url),
                cookie: from(sessionServices.commitSession(session)),
                lang: lang$,
              }),
            ),
            map(({ url, cookie, lang }) => {
              return redirectToDashboard(url, cookie, lang!);
            }),
          ),
        ),
      )
      .pipe(catchError((fn) => of(typeof fn === "function" ? fn : () => fn)));

    const resultFn = await lastValueFrom(result$);
    return resultFn();
  }
}
