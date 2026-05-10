import { Hono } from "hono";

import type { HonoEnv } from "../../types";
import { getD1Db } from "../../helpers/d1";
import { requirePermission } from "../../middleware/rbac";
import { createSignInLogDAL } from "@workspace/database/dals/sign-in/SignInLogDAL";
import { createLoginLogDAL } from "@workspace/database/dals/system/LoginLogDAL";
import { loadAdminDashboardStats } from "./dashboard-stats";
import { rfj, rsj } from "../../utils/server/response-json";

export const dashboardRouter = new Hono<HonoEnv>();

dashboardRouter.get("/", requirePermission("dashboard:read"), async (c) => {
  try {
    const db = getD1Db(c);
    const signInLogDAL = createSignInLogDAL(db);
    const loginLogDAL = createLoginLogDAL(db);
    const userId = c.get("userId");
    if (!userId) {
      return rfj({}, "No Authorization No User", { status: 401 });
    }
    const permissions = c.get("permissions") ?? [];
    const isLogin = await signInLogDAL.getUserTodayUserSignLogById(userId);
    const latestLoginLog = await loginLogDAL.getLoginLogLatestByUserId(userId);
    const stats = await loadAdminDashboardStats(db, permissions);
    return rsj({ isLogin, latestLoginLog, stats });
  } catch (error) {
    console.error("dashboardRouter error", error);
    return rfj(error as Error);
  }
});
