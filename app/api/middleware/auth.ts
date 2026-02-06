import { createMiddleware } from "hono/factory";
import type { HonoEnv } from "../types";
import { auth } from "~/libs/auth/server";
import { fail } from "~/utils/response";

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
	c.set("userId", result.user.id);
	c.set("username", result.user.name || result.user.email || null);

	await next();
});
