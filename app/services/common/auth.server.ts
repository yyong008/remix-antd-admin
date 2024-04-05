import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import type { Observable } from "rxjs";

import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { combineLatest, from, of, switchMap, map } from "rxjs";
import { ADMIN_ROUTE_PREFIX } from "~/constants";

type SessionData = {
  userId: string;
};

type SessionFlashData = {
  error: string;
};

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

export async function logout(request: Request, lang: string) {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/" + lang + "/" + ADMIN_ROUTE_PREFIX + "/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}

/**
 *
 * @param request 请求对象
 * @returns userId
 */
export async function getUserId(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");

  if (!userId || typeof userId !== "string") {
    return null;
  }
  return +userId;
}

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

export async function auth({
  request,
  params,
}: ActionFunctionArgs | LoaderFunctionArgs): Promise<
  [number | null, () => Promise<any>, number]
> {
  const IS_PRESENTATION_MODE = Number(process.env.PRESENTATION_MODE ?? 0);
  const { lang } = params;
  const userId = await getUserId(request);
  const session = await getSession(request.headers.get("Cookie"));
  const redirectToLogin = async () => {
    return redirect(`/${lang}/${ADMIN_ROUTE_PREFIX}/login`, {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  };

  return [userId, redirectToLogin, IS_PRESENTATION_MODE];
}

export function auth$({
  request,
  params,
}: ActionFunctionArgs | LoaderFunctionArgs): Observable<
  [number | null, () => Promise<any>]
> {
  const redirectToLogin = (session) => async () => {
    return redirect(`/${params.lang}/${ADMIN_ROUTE_PREFIX}/login`, {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  };
  return getUserId$(request).pipe(
    switchMap((userId) =>
      combineLatest([
        of(userId),
        from(getSession(request.headers.get("Cookie"))).pipe(
          map((session) => redirectToLogin(session)),
        ),
      ]),
    ),
  );
}
