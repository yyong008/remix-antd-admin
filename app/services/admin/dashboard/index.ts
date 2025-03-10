import { joseJwt } from "@/libs/jose";
import { signInLog } from "@/dals/sign-in/signInLog";
import { loginLogDAL } from "~/dals/system/LoginLogDAL";

class DashboardService {
  async getDashboardData(req: Request) {
    const data = await joseJwt.getTokenUserIdByArgs({ request: req });
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
