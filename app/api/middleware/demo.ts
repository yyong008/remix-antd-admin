import { createMiddleware } from "hono/factory";

import type { HonoEnv } from "../types";
import { respPresentationModeJson } from "~/utils/server/response-json";

const DEMO_TRUE_VALUES = new Set(["1", "true", "yes", "on"]);
const WRITE_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);

const isDemoModeEnabled = () => {
	const raw = process.env.DEMO_MODE;
	if (!raw) {
		return false;
	}
	return DEMO_TRUE_VALUES.has(raw.toLowerCase());
};

export const demoModeMiddleware = createMiddleware<HonoEnv>(async (c, next) => {
	if (!isDemoModeEnabled()) {
		return next();
	}

	if (WRITE_METHODS.has(c.req.method.toUpperCase())) {
		return respPresentationModeJson();
	}

	await next();
});
