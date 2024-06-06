// types
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import type { Observable } from "rxjs";

// rxjs
import { combineLatest, from, of, switchMap, map } from "rxjs";

// remix
import { createCookieSessionStorage, redirect } from "@remix-run/node";

type SessionData = {
  userId: string;
};

type SessionFlashData = {
  error: string;
};

/**
 * session 管理工具函数
 */
export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: "__session",
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secrets: [process.env.SESSION_SECRET!],
      secure: process.env.NODE_ENV === "production",
      maxAge: 60_000,
    },
  });

/**
 * 根据 cookie + lang 设置高阶重定向函数
 * @param SetCookie cookie
 * @param lang 语言
 * @returns
 */
const redirectToLoginHigherOrder = (SetCookie: string, lang: string) => () => {
  return redirect(`/${lang}/admin/login`, {
    headers: {
      "Set-Cookie": SetCookie,
    },
  });
};

/**
 * 登出
 * @param request
 * @param lang
 * @returns
 */
export function logout$(request: Request, lang: string) {
  return from(getSession(request.headers.get("Cookie"))).pipe(
    switchMap((session) => from(destroySession(session))),
    map((SetCookie) => redirectToLoginHigherOrder(SetCookie, lang!)),
  );
}

/**
 * 获取用户 userId
 * @param request 请求对象
 * @returns userId
 */
export function getUserId$(request: Request) {
  return from(getSession(request.headers.get("Cookie"))).pipe(
    map((session) => session.get("userId")),
    map((userId) => {
      if (!userId || typeof userId !== "string") {
        return null;
      }
      return +userId;
    }),
  );
}

/**
 * 检查授权
 * @param param0
 * @returns
 */
export function auth$({
  request,
  params,
}: ActionFunctionArgs | LoaderFunctionArgs): Observable<
  [number | null, () => any, number]
> {
  return getUserId$(request).pipe(
    switchMap((userId) =>
      combineLatest([
        of(userId),
        from(getSession(request.headers.get("Cookie"))).pipe(
          switchMap((session) => from(destroySession(session))),
          map((SetCookie) =>
            redirectToLoginHigherOrder(SetCookie, params.lang!),
          ),
        ),
        of(Number(process.env.PRESENTATION_MODE ?? 0)),
      ]),
    ),
  );
}
