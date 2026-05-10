import type { HonoEnv } from "../../types";

import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";
import { createAuth } from "@workspace/auth/server";

export const authRouter = new Hono<HonoEnv>();

authRouter.post("/login", async (c) => {
  const env: Env = c.env;
  const db = drizzle(env.DB);
  const auth = createAuth(db, env);

  const body = await c.req.json().catch(() => ({}));
  console.log("body", body);
  const { email, password } = body;

  if (!email || !password) {
    return c.json(
      { code: 1, message: "Email and password are required", data: null },
      { status: 400 },
    );
  }

  try {
    const response = await auth.api.signInEmail({
      body: {
        email,
        password,
        callbackURL: "/",
        rememberMe: true,
      },
      headers: c.req.raw.headers,
      asResponse: true,
    });

    const result = await response.json();

    const setCookieHeaders = response.headers.getSetCookie?.() || [];
    setCookieHeaders.forEach((cookie) => {
      c.header("Set-Cookie", cookie);
    });

    return c.json({
      code: 0,
      message: "success",
      data: {
        token: result.token,
        user: result.user,
        redirect: result.redirect,
      },
    });
  } catch (error: any) {
    const message = error?.message || "Login failed";
    return c.json({ code: 1, message, data: null }, { status: 401 });
  }
});

authRouter.post("/register", async (c) => {
  const env: Env = c.env;
  const db = drizzle(env.DB);
  const auth = createAuth(db, env);

  const body = await c.req.json().catch(() => ({}));
  console.log(body);
  const { username, email, password } = body;

  if (!username || !email || !password) {
    return c.json(
      { code: 1, message: "Username, email and password are required", data: null },
      { status: 400 },
    );
  }

  try {
    const response = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name: username,
      },
      headers: c.req.raw.headers,
      asResponse: true,
    });

    const setCookieHeaders = response.headers.getSetCookie?.() || [];
    setCookieHeaders.forEach((cookie) => {
      c.header("Set-Cookie", cookie);
    });

    const result = await response.json();
    console.log("result", result);

    if (result.code) {
      return c.json({
        code: 1,
        message: result.messaage,
      });
    }

    return c.json({
      code: 0,
      message: "success",
      data: {
        token: result.token,
        user: result.user,
        redirect: result.redirect,
      },
    });
  } catch (error: any) {
    const message = error?.message || "Registration failed";
    return c.json({ code: 1, message, data: null }, { status: 400 });
  }
});

authRouter.post("/logout", async (c) => {
  const env: Env = c.env;
  const db = drizzle(env.DB);
  const auth = createAuth(db, env);

  try {
    const response = await auth.api.signOut({
      headers: c.req.raw.headers,
      asResponse: true,
    });

    const setCookieHeaders = response.headers.getSetCookie?.() || [];
    setCookieHeaders.forEach((cookie) => {
      c.header("Set-Cookie", cookie);
    });

    const result = await response.json();

    if (!result) {
      return c.json({
        code: 1,
        message: "fail",
        data: { success: true },
      });
    }

    return c.json({
      code: 0,
      message: "success",
      data: { success: true },
    });
  } catch (error: any) {
    const message = error?.message || "Logout failed";
    return c.json({ code: 1, message, data: null }, { status: 400 });
  }
});

authRouter.get("/session", async (c) => {
  const env: Env = c.env;
  const db = drizzle(env.DB);
  const auth = createAuth(db, env);

  try {
    const result = await auth.api.getSession({
      headers: c.req.raw.headers,
    });

    return c.json({
      code: 0,
      message: "success",
      data: {
        session: result?.session ?? null,
        user: result?.user ?? null,
      },
    });
  } catch (error: any) {
    return c.json({
      code: 0,
      message: "success",
      data: {
        session: null,
        user: null,
      },
    });
  }
});
