import { signInLog } from "~/dals/sign-in/SignInLogDAL";
import { joseJwt } from "@/libs/jose";
import { type ActionFunctionArgs } from "@remix-run/node";

class SignInService {
  /**
   * 创建用户登录日志
   * @param args
   * @returns
   */
  async create(args: ActionFunctionArgs) {
    const data = (await joseJwt.getTokenUserIdByArgs(args)) as any;
    const result = await signInLog.create({
      userId: data.userId,
      signType: 1,
      signTime: new Date(),
    });
    return result;
  }
}

export const signInService = new SignInService();
