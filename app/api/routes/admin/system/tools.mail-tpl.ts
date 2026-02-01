import { Hono } from "hono";

import type { HonoEnv } from "../../../types";
import { rfj } from "~/utils/server/response-json";

export const toolsMailTplRouter = new Hono<HonoEnv>();

toolsMailTplRouter.get("/mail/tpl", async () => {
	return rfj({}, "Unsupport", { status: 501 });
});

toolsMailTplRouter.post("/mail/tpl", async () => {
	return rfj({}, "Unsupport", { status: 501 });
});

toolsMailTplRouter.put("/mail/tpl", async () => {
	return rfj({}, "Unsupport", { status: 501 });
});

toolsMailTplRouter.delete("/mail/tpl", async () => {
	return rfj({}, "Unsupport", { status: 501 });
});
