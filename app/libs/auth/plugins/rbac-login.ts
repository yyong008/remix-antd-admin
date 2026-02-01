import { createAuthMiddleware } from "better-auth/api";
import type { BetterAuthPlugin } from "better-auth";
import { eq } from "drizzle-orm";
import { randomUUID } from "node:crypto";
import { userRoles, users } from "db/schema";

import { loginLogDAL } from "~/dals/system/LoginLogDAL";
import { userDAL } from "~/dals/system/UserDAL";
import { db } from "~/libs/neon";
import { bcryptUtil } from "~/utils/server/bcrypt.util";
import { getLoginInfo } from "~/utils/server/ip.util";

type RbacLoginPluginOptions = {
	defaultRoleId?: number;
};

export function rbacLoginPlugin(
	options: RbacLoginPluginOptions = {},
): BetterAuthPlugin {
	const defaultRoleId =
		Number(options.defaultRoleId ?? Number(process.env.DEFAULT_ROLE_ID ?? 3));

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

						if (path === "/sign-up/email") {
							const password =
								typeof ctx.body?.password === "string"
									? ctx.body.password
									: undefined;

							const existing = await db
								.select()
								.from(users)
								.where(eq(users.email, newSession.user.email ?? ""))
								.limit(1);
							if (existing[0]) return;

							const created = await db
								.insert(users)
								.values({
									name: newSession.user.name ?? newSession.user.email ?? "User",
									email: newSession.user.email,
									password: bcryptUtil.hashPassword(password ?? randomUUID()),
								})
								.returning();

							const sysUser = created[0];
							if (!sysUser?.id) return;
							if (Number.isFinite(defaultRoleId)) {
								await db.insert(userRoles).values({
									userId: sysUser.id,
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
								const sysUser = await userDAL.getByAuthUserId(newSession.user.id);
								if (!sysUser) return;
								const request = ctx.request ?? ctx.context.request;
								if (!request) return;
								const loginInfo = await getLoginInfo(request);
								await loginLogDAL.create({
									name: sysUser.name,
									ip: loginInfo.ip,
									address: loginInfo.address,
									system: loginInfo.system,
									browser: loginInfo.browser,
									userId: sysUser.id,
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
