import { createAuthMiddleware } from "better-auth/api";
import type { BetterAuthPlugin } from "better-auth";
import { eq } from "drizzle-orm";
import { user, userRoles } from "db/schema";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { getLoginInfo } from "~/utils/server/ip.util";

type RbacLoginPluginOptions = {
  defaultRoleId?: number;
  db?: DrizzleD1Database;
};

export function rbacLoginPlugin(options: RbacLoginPluginOptions = {}): BetterAuthPlugin {
  const defaultRoleId = Number(options.defaultRoleId ?? 3);

  return {
    id: "rbac-login",
    hooks: {
      after: [
        {
          matcher() {
            return true;
          },
          handler: createAuthMiddleware(async (ctx) => {
            const path = ctx.path ?? "";
            const newSession = ctx.context.newSession;
            if (!newSession?.user?.id) return;

            const db = options.db;
            if (!db) {
              console.warn("rbac-login plugin: db not provided, skipping...");
              return;
            }

            if (path === "/sign-up/email") {
              if (Number.isFinite(defaultRoleId)) {
                await db.insert(userRoles).values({
                  userId: newSession.user.id,
                  roleId: defaultRoleId,
                });
              }
            }

            if (
              path.startsWith("/sign-in") ||
              path.startsWith("/callback") ||
              path.startsWith("/oauth2/callback")
            ) {
              try {
                const rows = await db
                  .select()
                  .from(user)
                  .where(eq(user.id, newSession.user.id))
                  .limit(1);
                const authUser = rows[0];
                if (!authUser) return;
                const request = ctx.request ?? ctx.context.request;
                if (!request) return;
                const loginInfo = await getLoginInfo(request);
                const { createLoginLogDAL } = await import("~/dals/system/LoginLogDAL");
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
              } catch {
                // Avoid breaking auth if logging fails.
              }
            }
          }),
        },
      ],
    },
  };
}
