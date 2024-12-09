import { type LoaderFunctionArgs } from "@remix-run/node";
import { profileAccountDAL } from "@/dals/profile/ProfileAccountDAL";
import { joseJwt } from "@/libs/jose";

class ProfileAccountService {
  /**
   * 获取用户数据
   * @param args
   * @returns
   */
  async getByUserId(args: LoaderFunctionArgs) {
    const payload = await joseJwt.getTokenUserIdByArgs(args);
    const result = await profileAccountDAL.getById(payload.userId);
    return result;
  }
}

export const profileAccountService = new ProfileAccountService();
