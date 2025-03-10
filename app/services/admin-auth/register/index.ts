import { type ActionFunctionArgs } from "react-router";
import {
  ERRIR_USER_DISABLED,
  ERROR_PASSWWORD,
  ERROR_UNREGISTER,
} from "@/constants/error";

import { loginDAL } from "@/dals/login/LoginDAL";
import { loginLogDAL } from "@/dals/system/LoginLogDAL";
import { bcryptUtil } from "@/utils/server/bcrypt.util";
import { ipUtils } from "@/utils/server/ip.util";
import { userDAL } from "@/dals/system/UserDAL";
import { Roles } from "@/types";
class RegisterService {
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
  async simplefindUserByName(dataDto: any) {
    const user: any = await loginDAL.findByUserName(dataDto.username);
    return user;
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
  async recordLoginLog(args: ActionFunctionArgs, user: any) {
    try {
      const loginLog = await ipUtils.getLoginInfo(args.request);
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
  async register(req: Request) {
    const vDto = await req.json();
    if (vDto.password !== vDto.passwordRe) throw Error(ERROR_PASSWWORD);
    const user = await this.simplefindUserByName(vDto);
    if (user) throw Error("用户已存在");
    let new_user: any = await userDAL.create({
      ...vDto,
      name: vDto.username,
      password: bcryptUtil.hashPassword(vDto.password),
      departmentId: 1,
      roles: [Roles.User],
    });
    if (!new_user) throw Error("注册失败");
    let find_new_user: any = await loginDAL.findByUserName(vDto.username);
    if (!find_new_user) throw Error("注册失败");
    if (find_new_user.password) {
      delete find_new_user.password;
    }
    return find_new_user;
  }
}

export const registerService = new RegisterService();
