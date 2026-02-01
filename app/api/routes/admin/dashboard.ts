import { Hono } from "hono";

import type { HonoEnv } from "../../types";
import { signInLog } from "~/dals/sign-in/signInLog";
import { loginLogDAL } from "~/dals/system/LoginLogDAL";
import { rfj, rsj } from "~/utils/server/response-json";

export const dashboardRouter = new Hono<HonoEnv>();

dashboardRouter.get("/", async (c) => {
	try {
		const userId = c.get("userId");
		if (!userId) {
			return rfj({}, "No Authorization No User", { status: 401 });
		}
		const isLogin = await signInLog.getUserTodayUserSignLogById(userId);
		const latestLoginLog = await loginLogDAL.getLoginLogLatestByUserId(userId);
		return rsj({ isLogin, latestLoginLog });
	} catch (error) {
		return rfj(error as Error);
	}
});
