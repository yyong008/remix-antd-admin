import { createAuthMiddleware } from "better-auth/api";
import type { BetterAuthPlugin } from "better-auth";
import { eq } from "drizzle-orm";
import { roles, userRoles } from "database/schema";
import { type DB } from "better-auth/adapters/drizzle";
const DEFAULT_SIGNUP_ROLE_VALUE = "user";

type RbacLoginPluginOptions = {
  db?: DB;
  defaultRoleValue?: string;
};

export function rbacLoginPlugin(options: RbacLoginPluginOptions = {}): BetterAuthPlugin {
  const defaultRoleValue = options.defaultRoleValue ?? DEFAULT_SIGNUP_ROLE_VALUE;

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
              const roleRows = await db
                .select({ id: roles.id })
                .from(roles)
                .where(eq(roles.value, defaultRoleValue))
                .limit(1);
              const roleId = roleRows[0]?.id;
              if (roleId) {
                await db.insert(userRoles).values({
                  id: crypto.randomUUID(),
                  userId: newSession.user.id,
                  roleId,
                });
              } else {
                console.warn(
                  `rbac-login: no sys_role with value="${defaultRoleValue}", skipping default role assignment`,
                );
              }
            }
          }),
        },
      ],
    },
  };
}
