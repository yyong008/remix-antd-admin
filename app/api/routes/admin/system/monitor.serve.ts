import { Hono } from "hono";

import type { HonoEnv } from "../../../types";
import { rfj } from "~/utils/server/response-json";

export const monitorServeRouter = new Hono<HonoEnv>();

monitorServeRouter.get("/monitor/serve", async () => {
	return rfj({}, "Unsupport", { status: 501 });
});

monitorServeRouter.post("/monitor/serve", async () => {
	return rfj({}, "Unsupport", { status: 501 });
});

monitorServeRouter.put("/monitor/serve", async () => {
	return rfj({}, "Unsupport", { status: 501 });
});

monitorServeRouter.delete("/monitor/serve", async () => {
	return rfj({}, "Unsupport", { status: 501 });
});
