import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, captcha, openAPI } from "better-auth/plugins";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "db/schema";
import type { D1Database } from "@cloudflare/workers-types";
import { rbacLoginPlugin } from "./plugins/rbac-login";

type AuthEnv = {
  DB: D1Database;
  TURNSTILE_SECRET_KEY?: string;
  GITHUB_CLIENT_ID?: string;
  GITHUB_CLIENT_SECRET?: string;
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
  NODE_ENV?: string;
};

export function createAuth(env: AuthEnv) {
  const db = drizzle(env.DB);

  return betterAuth({
    baseURL: "http://localhost:5173",
    database: drizzleAdapter(db, {
      provider: "sqlite",
      schema,
    }),
    plugins: [
      admin(),
      openAPI(),
      captcha({
        provider: "cloudflare-turnstile",
        secretKey: env.TURNSTILE_SECRET_KEY,
      }),
      rbacLoginPlugin({ db }),
    ],
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: env.NODE_ENV === "production",
    },
    socialProviders: {
      github: {
        clientId: env.GITHUB_CLIENT_ID,
        clientSecret: env.GITHUB_CLIENT_SECRET,
      },
      google: {
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
      },
    },
    session: {
      expiresIn: 60 * 60 * 24 * 7,
      updateAge: 60 * 60 * 24,
    },
    advanced: {
      database: {
        generateId: () => {
          return crypto.randomUUID();
        },
      },
    },
  });
}

export type AuthInstance = ReturnType<typeof createAuth>;
