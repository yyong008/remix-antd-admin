import * as loginLog from "@workspace/database/repositories/system/login-log";
import { createAuthMiddleware } from "better-auth/api";
import type { BetterAuthPlugin } from "better-auth";
import { type DB } from "better-auth/adapters/drizzle";

type LoginLoggerPluginOptions = {
  db?: DB;
};

/**
 * Records every successful email sign-in into `sys_loginlog` so the admin
 * "登录记录" page has data. Captures IP (CF / XFF), user-agent, and parses a
 * lightweight `system` / `browser` label for the dashboard card.
 */
export function loginLoggerPlugin(options: LoginLoggerPluginOptions = {}): BetterAuthPlugin {
  return {
    id: "login-logger",
    hooks: {
      after: [
        {
          matcher: (ctx) => ctx.path === "/sign-in/email",
          handler: createAuthMiddleware(async (ctx) => {
            const newSession = ctx.context.newSession;
            if (!newSession?.user?.id) return;

            const rawDb = options.db;
            if (!rawDb) {
              console.warn("login-logger plugin: db not provided, skipping...");
              return;
            }

            const headers = ctx.headers;
            const ua = headers?.get("user-agent") ?? "";
            const ip =
              headers?.get("cf-connecting-ip") ??
              headers?.get("x-forwarded-for")?.split(",")[0]?.trim() ??
              "";

            const user = newSession.user as { name?: string | null; email?: string | null };
            const displayName = user.name?.trim() || user.email?.trim() || user.name || "Unknown";

            try {
              await loginLog.create(rawDb as any, {
                id: crypto.randomUUID(),
                name: displayName,
                userId: newSession.user.id,
                ip: ip || null,
                address: null,
                system: parseSystem(ua),
                browser: parseBrowser(ua),
                loginAt: new Date(),
              });
            } catch (err) {
              console.error("[login-logger] failed to record sign-in", err);
            }
          }),
        },
      ],
    },
  };
}

function parseSystem(ua: string): string {
  if (!ua) return "Unknown";
  if (/iPhone|iPad|iPod/i.test(ua)) return "iOS";
  if (/Android/i.test(ua)) return "Android";
  if (/Windows/i.test(ua)) return "Windows";
  if (/Mac OS X|macOS/i.test(ua)) return "macOS";
  if (/Linux/i.test(ua)) return "Linux";
  return "Unknown";
}

function parseBrowser(ua: string): string {
  if (!ua) return "Unknown";
  if (/Edg\//i.test(ua)) return "Edge";
  if (/Firefox\//i.test(ua)) return "Firefox";
  if (/OPR\//i.test(ua)) return "Opera";
  if (/Chrome\//i.test(ua) && !/Chromium/i.test(ua)) return "Chrome";
  if (/Version\//i.test(ua) && /Safari\//i.test(ua)) return "Safari";
  return "Unknown";
}
