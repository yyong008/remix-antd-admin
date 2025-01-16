import { joseJwt } from "@/libs/jose";
import { type LoaderFunctionArgs } from "react-router";
import { signInLog } from "@/dals/sign-in/signInLog";
import { loginLogDAL } from "~/dals/system/LoginLogDAL";

class DashboardService {
  async getDashboardData(args: LoaderFunctionArgs) {
    const data = await joseJwt.getTokenUserIdByArgs(args);
    let isLogin = await signInLog.getUserTodayUserSignLogById(data.userId!);
    const latestLoginLog = await loginLogDAL.getLoginLogLatestByUserId(
      data?.userId,
    );

    return {
      isLogin,
      latestLoginLog,
    };
  }
}

export const dashboardServices = new DashboardService();
