import {
  ERRIR_USER_DISABLED,
  ERROR_PASSWWORD,
  ERROR_UNREGISTER,
} from "@/constants/error";
import { joseJwt } from "@/libs/jose";

import { loginDAL } from "@/dals/login/LoginDAL";
import { loginLogDAL } from "@/dals/system/LoginLogDAL";
import { bcryptUtil } from "@/utils/server/bcrypt.util";
import { ipUtils } from "@/utils/server/ip.util";

class LoginService {
  /**
   * 匹配密码
   * @param dataDto
   * @param user
   * @returns
   */
  matchPassword(dataDto: any, user: any) {
    const isMatch = bcryptUtil.comparePassword(
      dataDto.password,
      user!.password,
    );
    if (!isMatch) throw Error(ERROR_PASSWWORD);
    return isMatch;
  }

  /**
   * 根据 Name 发现用户
   * @param dataDto
   * @returns
   */
  async findUserByName(dataDto: any) {
    const user: any = await loginDAL.findByUserName(dataDto.username);
    if (!user) throw Error(ERROR_UNREGISTER);
    if (user.status === 0) throw new Error(ERRIR_USER_DISABLED);
    return user;
  }

  /**
   * 记录登陆日志
   * @param args
   * @param user
   */
  async recordLoginLog(req:  Request, user: any) {
    try {
      const loginLog = await ipUtils.getLoginInfo(req);
      loginLogDAL.create({
        ...loginLog,
        name: user!.name,
        userId: user!.id,
      });
    } catch (error) {
      console.error("❌ >> login record login log: ", error);
    }
  }

  /**
   * 登陆
   * @param args
   * @returns
   */
  async loginAction(req: Request) {
    const vDto = await req.json();
    const user = await this.findUserByName(vDto);
    this.matchPassword(vDto, user);
    this.recordLoginLog(req, user);
    const ts = {
      refresh_token: await joseJwt.signRefreshToken(user.id),
      token: await joseJwt.signToken(user.id),
    };
    return ts;
  }
}

export const loginService = new LoginService();
