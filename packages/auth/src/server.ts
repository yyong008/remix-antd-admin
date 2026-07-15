import { type DB } from "better-auth/adapters/drizzle";

import { betterAuth } from "better-auth";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "database/schema";
import { admin, openAPI } from "better-auth/plugins";
import { rbacLoginPlugin } from "./plugins/rbac-login";
import { loginLoggerPlugin } from "./plugins/login-logger";
import { customSessionPlugin } from "./plugins/custom-session";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export function createAuth(database: DB, env: Env) {
  const db = database ?? drizzle(env.DB);

  return betterAuth({
    database: drizzleAdapter(db, {
      provider: "sqlite",
      schema,
    }),
    plugins: [
      rbacLoginPlugin({ db }),
      loginLoggerPlugin({ db }),
      admin(),
      openAPI(),
      customSessionPlugin(),
    ],
    user: {
      additionalFields: {
        nickname: {
          type: "string",
          required: false,
        },
        avatar: {
          type: "string",
          required: false,
        },
        locale: {
          type: "string",
          required: false,
          defaultValue: "en-US",
        },
        theme: {
          type: "string",
          required: false,
          defaultValue: "light",
        },
        phone: {
          type: "string",
          required: false,
        },
        remark: {
          type: "string",
          required: false,
        },
        departmentId: {
          type: "string",
          required: false,
        },
        status: {
          type: "number",
          required: false,
        },
      },
    },
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
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
      ipAddress: {
        ipAddressHeaders: ["cf-connecting-ip"],
      },
    },
  });
}

export type Auth = ReturnType<typeof createAuth>;
