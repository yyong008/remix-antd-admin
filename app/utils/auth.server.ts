import { createCookieSessionStorage, redirect } from "@remix-run/node";

// auth
import { Authenticator } from "remix-auth";

// auth strategy form
import { FormStrategy } from "remix-auth-form";

// utils
import bcrypt from "bcryptjs";

// db
import db from "~/utils/db.server";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: ["s3cret"],
    secure: process.env.NODE_ENV === "production",
    // expires: new Date(Date.now() + 60_000),
  },
});

export const auth = new Authenticator<string>(sessionStorage);

auth.use(
  new FormStrategy(async ({ form }: any) => {
    const username = form.get("username") as string;
    const password = form.get("password") as string;

    let user: any = await login(username, password);

    return user;
  }),
  "user-pass",
);

export async function login(username: string, password: string) {
  const user: any = await db.user
    .findUnique({
      where: { username },
      include: {
        password: true,
      },
    })
    .then((res: any) => {
      return res;
    })
    .catch((err: any) => {
      console.error(err);
      return "";
    });

  if (!user) return null;
  const isCorrectPassword = await bcrypt.compare(password, user.password.hash);
  if (!isCorrectPassword) return null;
  return { id: user.id, username };
}

export async function routeAuthFailure({ request, params }: any, json: any) {
  await auth
    .isAuthenticated(request, {
      failureRedirect: "/" + params.lang + "/user/login",
    })
    .catch((e) => {
      return json({ err: e });
    });
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie"),
  );
  const error = session.get(auth.sessionErrorKey) as LoaderError;
  return json({ error });
}
