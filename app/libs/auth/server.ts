import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, openAPI } from "better-auth/plugins";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "db/schema";
import type { D1Database } from "@cloudflare/workers-types";
import { createLoginLogDAL } from "~/dals/system/LoginLogDAL";
import { rbacLoginPlugin } from "~/libs/auth/plugins/rbac-login";
import { getLoginInfo } from "~/utils/server/ip.util";
import { getBaseUrl } from "~/utils/url";

type AuthEnv = {
  DB: D1Database;
  /** When `"true"` and `TURNSTILE_SECRET_KEY` is set, Turnstile verification is enforced server-side. */
  TURNSTILE_ENABLED?: string;
  TURNSTILE_SECRET_KEY?: string;
  GITHUB_CLIENT_ID?: string;
  GITHUB_CLIENT_SECRET?: string;
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
  NODE_ENV?: string;
};

function isServerTurnstileEnabled(env: AuthEnv): boolean {
  return env.TURNSTILE_ENABLED === "true" && Boolean(env.TURNSTILE_SECRET_KEY?.trim());
}

function requestLikeFromAuthContext(
  ctx: { request?: Request } | null | undefined,
  session: { ipAddress?: string | null; userAgent?: string | null },
): { headers: Headers } {
  const req = ctx?.request;
  if (req?.headers) return { headers: req.headers };
  const headers = new Headers();
  const ip = session.ipAddress?.trim();
  const ua = session.userAgent?.trim();
  if (ip) headers.set("cf-connecting-ip", ip);
  if (ua) headers.set("user-agent", ua);
  return { headers };
}

export function createAuth(env: AuthEnv) {
  const db = drizzle(env.DB);
  const useTurnstile = isServerTurnstileEnabled(env);

  return betterAuth({
    baseURL: getBaseUrl(),
    database: drizzleAdapter(db, {
      provider: "sqlite",
      schema,
    }),
    plugins: [rbacLoginPlugin({ db }), admin(), openAPI()],
    databaseHooks: {
      session: {
        create: {
          after: async (sessionRow, endpointCtx) => {
            const userId = sessionRow.userId;
            if (!userId) return;
            try {
              const rows = await db
                .select()
                .from(schema.user)
                .where(eq(schema.user.id, userId))
                .limit(1);
              const authUser = rows[0];
              if (!authUser) return;
              const loginInfo = await getLoginInfo(
                requestLikeFromAuthContext(endpointCtx, sessionRow),
              );
              const loginLogDAL = createLoginLogDAL(db);
              await loginLogDAL.create({
                name: authUser.name,
                ip: loginInfo.ip,
                address: loginInfo.address,
                system: loginInfo.system,
                browser: loginInfo.browser,
                userId: authUser.id,
                loginAt: new Date(),
              });
            } catch (e) {
              console.error("[auth] session create login log failed", e);
            }
          },
        },
      },
    },
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
        /** FK to `sys_department.id` (optional). */
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
      requireEmailVerification: env.NODE_ENV === "production",
    },
    // socialProviders: {
    //   github: {
    //     clientId: env.GITHUB_CLIENT_ID!,
    //     clientSecret: env.GITHUB_CLIENT_SECRET,
    //   },
    //   google: {
    //     clientId: env.GOOGLE_CLIENT_ID!,
    //     clientSecret: env.GOOGLE_CLIENT_SECRET,
    //   },
    // },
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
        ipAddressHeaders: ["cf-connecting-ip"], // or any other custom header
      },
    },
  });
}

export type AuthInstance = ReturnType<typeof createAuth>;
