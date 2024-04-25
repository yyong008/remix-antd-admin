// types
import type { ActionFunctionArgs } from "@remix-run/node";

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

// schemas
import { loginLogSchema } from "~/schema/login.schema";

// server
import { commitSession, getSession } from "~/server/services/common/session";
import { findByUserName$ } from "~/server/services/login";
import { createLoginLog } from "../../services/system/login-log";

export class LoginController {
  // @validate(LoginSchema)
  static async action({ request, params }: ActionFunctionArgs) {
    const method = request.method;
    switch (method) {
      case "POST":
        return LoginController.post({ request, params } as ActionFunctionArgs);
      default:
        serverUtils.respUnSupportJson();
        break;
    }
  }

  static async loader() {
    return serverUtils.respSuccessJson({});
  }

  static async post({ request, params }: ActionFunctionArgs) {
    const session$ = from(getSession(request.headers.get("Cookie")));
    const lang$ = of(params?.lang).pipe(defaultIfEmpty(defaultLang));
    const dataDto$ = from(request.json());

    const crreateErrorHandle = (message?: string) => () => {
      return serverUtils.respFailJson(
        {},
        message ?? "登录失败,用户名或密码错误!",
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
      switchMap((dataDto) => findByUserName$(dataDto.username)),
      catchError((e) => throwError(crreateErrorHandle(e ?? "未注册"))),
    );

    const loginResult$ = forkJoin([dataDto$, user$, session$]).pipe(
      switchMap((v) => {
        const [dataDto, user, session] = v;
        return iif(
          () => dataDto === null,
          from([]).pipe(
            switchMap(() => {
              session.flash("error", "Invalid username/password");
              return throwError(
                crreateErrorHandle("Invalid username/password"),
              );
            }),
          ),
          of([dataDto, user]).pipe(
            tap(() => {
              session.set("userId", String(user?.id));
            }),
          ),
        );
      }),
      map((v) => ({
        user: v[1],
        passwordMatch: serverUtils.comparePassword(
          v[0].password,
          v[1].password,
        ),
      })),
      switchMap(({ user, passwordMatch }) => {
        return iif(
          () => passwordMatch,
          of(user),
          throwError(crreateErrorHandle("Invalid username/password")),
        );
      }),
      switchMap((user) =>
        from(serverUtils.getLoginInfo(request)).pipe(
          map((loginLog) =>
            loginLogSchema.parse({ ...loginLog, name: user.name }),
          ),
          switchMap((validateLoginLog) =>
            from(createLoginLog({ ...validateLoginLog })),
          ),
          switchMap(() => of(user)),
        ),
      ),
    );

    const url$ = forkJoin([loginResult$, lang$]).pipe(
      map((v) => `/${v[1]}/admin/dashboard?${v[0].username}`),
    );
    const result$ = url$.pipe(
      switchMap((url) =>
        from(session$).pipe(
          switchMap((session) =>
            forkJoin([of(url), from(commitSession(session)), lang$]),
          ),
          map((data) => ({ url: data[0], cookie: data[1], lang: data[2] })),
          map(({ url, cookie, lang }) => {
            return redirectToDashboard(url, cookie, lang!);
          }),
        ),
      ),
      catchError((e) => {
        return throwError(crreateErrorHandle(e.message));
      }),
    );

    const fn = await lastValueFrom(result$);
    const a = fn();
    return a;
  }
}
