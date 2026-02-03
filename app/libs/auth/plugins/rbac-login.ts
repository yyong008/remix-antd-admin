import { createAuthMiddleware } from "better-auth/api";
import type { BetterAuthPlugin } from "better-auth";
import { eq } from "drizzle-orm";
import { user, userRoles } from "db/schema";

import { loginLogDAL } from "~/dals/system/LoginLogDAL";
import { db } from "~/libs/neon";
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
