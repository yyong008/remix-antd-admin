import { Hono } from "hono";

import type { HonoEnv } from "../../types";
import { createSignInLogDAL } from "~/dals/sign-in/signInLog";
import { createLoginLogDAL } from "~/dals/system/LoginLogDAL";
import { rfj, rsj } from "~/utils/server/response-json";
import { getD1Db } from "~/api/helpers/d1";

export const dashboardRouter = new Hono<HonoEnv>();

dashboardRouter.get("/", async (c) => {
  try {
    const db = getD1Db(c);
    const signInLogDAL = createSignInLogDAL(db);
    const loginLogDAL = createLoginLogDAL(db);
    const userId = c.get("userId");
    if (!userId) {
      return rfj({}, "No Authorization No User", { status: 401 });
    }
    const isLogin = await signInLogDAL.getUserTodayUserSignLogById(userId);
    const latestLoginLog = await loginLogDAL.getLoginLogLatestByUserId(userId);
    return rsj({ isLogin, latestLoginLog });
  } catch (error) {
    return rfj(error as Error);
  }
});
