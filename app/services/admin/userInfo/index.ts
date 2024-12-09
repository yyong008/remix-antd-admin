import type * as rrn from "@remix-run/node";
import { userPermsDAL } from "@/dals/system/UserPermsDAL";
import { userDAL } from "@/dals/system/UserDAL";

import { joseJwt } from "@/libs/jose";

class UserInfoService {
  /**
   * 获取用户信息
   * @param args
   * @returns
   */
  async getUserInfo(args: rrn.LoaderFunctionArgs) {
    const { userId } = await joseJwt.getTokenUserIdByArgs(args);

    const menu = await userPermsDAL.getFlatMenuByUserId(userId!);
    const userInfo = await userDAL.getById(userId!);

    const result = {
      menu,
      userInfo,
    };
    return result;
  }
}

export const userInfoService = new UserInfoService();
