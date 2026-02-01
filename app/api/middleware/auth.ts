import { createMiddleware } from "hono/factory";
import type { HonoEnv } from "../types";
import { auth } from "~/libs/auth/server";
import { fail } from "~/utils/response";
import { db } from "~/libs/neon";
import { eq } from "drizzle-orm";
import { users } from "db/schema";

export const authMiddleware = createMiddleware<HonoEnv>(async (c, next) => {
	const result = await auth.api.getSession({
		headers: c.req.raw.headers,
	});

	if (!result?.user.id) {
		return c.json(fail("Unauthorized", 401), 401);
	}

	if (result.user?.banned) {
		return c.json(fail(result.user.banReason || "User banned", 403), 403);
	}

	const sysUser = await db
		.select()
		.from(users)
		.where(eq(users.email, result.user.email ?? ""))
		.limit(1);
	if (!sysUser[0]) {
		return c.json(fail("No Authorization No User", 401), 401);
	}
	c.set("userId", sysUser[0].id);

	await next();
});
