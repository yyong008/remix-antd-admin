import { createCookieSessionStorage, redirect } from "@remix-run/node";
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
      "Set-Cookie": await sessionStorage.destroySession(session),
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
