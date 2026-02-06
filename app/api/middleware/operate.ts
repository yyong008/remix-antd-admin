import { createMiddleware } from "hono/factory";

import type { HonoEnv } from "../types";
import { operateDAL } from "~/dals/operate/operateDAL";

function getClientIp(headers: Headers) {
	const cfIp = headers.get("cf-connecting-ip");
	if (cfIp) return cfIp;
	const xff = headers.get("x-forwarded-for");
	if (xff) return xff.split(",")[0]?.trim() || xff;
	return headers.get("x-real-ip");
}

export const operateMiddleware = createMiddleware<HonoEnv>(async (c, next) => {
	await next();

	try {
		const userId = c.get("userId");
		if (!userId) return;

		const req = c.req;
		await operateDAL.createOperate({
			userId,
			username: c.get("username") ?? null,
			path: req.path,
			url: req.url,
			method: req.method,
			ipAddress: getClientIp(req.raw.headers) ?? null,
			statusCode: c.res.status,
			updatedAt: new Date(),
		});
	} catch (error) {
		// logging failures should not break the request
		console.error("operateMiddleware failed:", error);
	}
});
