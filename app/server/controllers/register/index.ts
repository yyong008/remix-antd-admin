// types
import type { ActionFunctionArgs } from "@remix-run/node";

//remix
// import { redirect } from "@remix-run/node";

// rxjs
import {
  catchError,
  combineLatest,
  defaultIfEmpty,
  from,
  iif,
  map,
  of,
  switchMap,
  throwError,
} from "rxjs";

// decorators
import { validate } from "~/server/decorators/validate-schema";
import { defaultLang } from "~/config/lang";

// schemas
import { LoginSchema } from "~/schema/login.schema";
import { commitSession, getSession } from "~/server/services/common/session";
import { findByUserName$ } from "~/server/services/login";
import { comparePassword } from "~/server/utils/bcrypt.util";

// services

// utils
import * as respUtils from "~/server/utils/response.json";

export class RegisterController {
  static async action({ request, params }: ActionFunctionArgs) {
    const method = request.method;

    switch (method) {
      case "POST":
        RegisterController.post({ request, params } as ActionFunctionArgs);
        break;
      default:
        respUtils.respUnSupportJson();
        break;
    }
  }

  static async loader() {
    return respUtils.respSuccessJson({});
  }

  @validate(LoginSchema)
  static async post({ request, params }: ActionFunctionArgs) {
    const session$ = from(getSession(request.headers.get("Cookie")));
    const lang$ = of(params?.lang).pipe(defaultIfEmpty(defaultLang));
    const dataDto$ = from(request.json());
    const handleCompareError = () => () =>
      respUtils.respFailJson({}, "登录失败,用户名或密码错误!");

    const user$ = dataDto$.pipe(
      switchMap((dataDto) => findByUserName$(dataDto.username)),
      catchError((e) => throwError(handleCompareError())),
    );

    const loginResult$ = combineLatest([dataDto$, user$, session$]).pipe(
      switchMap((v) => {
        const [dataDto, user, session] = v;
        return iif(
          () => dataDto === null,
          from([]).pipe(
            switchMap(() => {
              session.flash("error", "Invalid username/password");
              return throwError(
                () => () => respUtils.respFailJson({}, "用户名或密码错误!"),
              );
            }),
          ),
          of([dataDto, user]),
        );
      }),
      map((v) => ({
        user: v[1],
        passwordMatch: comparePassword(v[0].password, v[1].password),
      })),
      switchMap(({ user, passwordMatch }) => {
        return iif(
          () => !passwordMatch,
          throwError(handleCompareError()),
          of(user),
        );
      }),
    );

    const url$ = combineLatest([loginResult$, lang$]).pipe(
      map((v) => `/${v[1]}/admin/dashboard`),
    );

    const result$ = url$.pipe(
      switchMap((url) =>
        from(session$).pipe(
          switchMap((session) => from(commitSession(session))),
          map((cookie) => ({ url, cookie })),
          map((cookie) => handleCompareError()),
        ),
      ),
      catchError((e) => of(handleCompareError())),
    );

    result$.subscribe({
      next(nextValFn) {
        nextValFn?.();
      },
      error(errorFn) {
        errorFn?.();
      },
    });
  }
}
