import { Hono } from "hono";

import { auth } from "~/libs/auth/server";

/**
 * @see https://www.better-auth.com/docs/integrations/hono#mount-the-handler
 */
export const authRouter = new Hono().on(
	["POST", "GET"],
	"/auth/*",
	async (c) => {
		return await auth.handler(c.req.raw);
	},
);
