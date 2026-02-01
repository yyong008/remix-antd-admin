import { Hono } from "hono";

import type { HonoEnv } from "../../types";
import { signInLog } from "~/dals/sign-in/signInLog";
import { loginLogDAL } from "~/dals/system/LoginLogDAL";
import { joseJwt } from "~/libs/jose";
import { rfj, rsj } from "~/utils/server/response-json";

export const dashboardRouter = new Hono<HonoEnv>();

dashboardRouter.get("/", async (c) => {
  try {
    const data = await joseJwt.getTokenUserIdByArgs({
      request: c.req.raw,
    } as any);
    const isLogin = await signInLog.getUserTodayUserSignLogById(data.userId!);
    const latestLoginLog = await loginLogDAL.getLoginLogLatestByUserId(
      data?.userId,
    );
    return rsj({ isLogin, latestLoginLog });
  } catch (error) {
    return rfj(error as Error);
  }
});
