import { Hono } from "hono";

import type { HonoEnv } from "../types";
import {
  ERRIR_USER_DISABLED,
  ERROR_PASSWWORD,
  ERROR_UNREGISTER,
} from "~/constants/error";
import { loginDAL } from "~/dals/login/LoginDAL";
import { loginLogDAL } from "~/dals/system/LoginLogDAL";
import { userDAL } from "~/dals/system/UserDAL";
import { joseJwt } from "~/libs/jose";
import { Roles } from "~/types";
import { bcryptUtil } from "~/utils/server/bcrypt.util";
import { ipUtils } from "~/utils/server/ip.util";
import { rfj, rsj } from "~/utils/server/response-json";

export const authRouter = new Hono<HonoEnv>();

authRouter.post("/login", async (c) => {
  try {
    const dto = await c.req.json();
    const user: any = await loginDAL.findByUserName(dto.username);
    if (!user) throw Error(ERROR_UNREGISTER);
    if (user.status === 0) throw new Error(ERRIR_USER_DISABLED);
    const isMatch = bcryptUtil.comparePassword(dto.password, user!.password);
    console.log("isMatch:", isMatch, dto.password, user!.password);
    if (!isMatch) throw Error(ERROR_PASSWWORD);
    try {
      const loginLog = await ipUtils.getLoginInfo(c.req.raw);
      loginLogDAL.create({
        ...loginLog,
        name: user!.name,
        userId: user!.id,
      });
    } catch (error) {
      console.error("❌ >> login record login log: ", error);
    }
    const ts = {
      refresh_token: await joseJwt.signRefreshToken(user.id),
      token: await joseJwt.signToken(user.id),
    };
    return rsj(ts);
  } catch (error) {
    return rfj(error as Error);
  }
});

authRouter.post("/register", async (c) => {
  try {
    const dto = await c.req.json();
    if (dto.password !== dto.passwordRe) throw Error(ERROR_PASSWWORD);
    const existing = await loginDAL.findByUserName(dto.username);
    if (existing) throw Error("用户已存在");
    const newUser: any = await userDAL.create({
      ...dto,
      name: dto.username,
      password: bcryptUtil.hashPassword(dto.password),
      departmentId: 1,
      roles: [Roles.User],
    });
    if (!newUser) throw Error("注册失败");
    const created = await loginDAL.findByUserName(dto.username);
    if (!created) throw Error("注册失败");
    if (created.password) {
      delete created.password;
    }
    return rsj(created);
  } catch (error) {
    return rfj(error as Error);
  }
});

authRouter.post("/refresh_token", async (c) => {
  try {
    const vDto = await c.req.json();
    const { refresh_token } = vDto;
    const result: any = await joseJwt.getPayloadByToken(refresh_token);
    if (result?.error) {
      throw new Error(result?.error?.message);
    }
    const userId = result.payload.userId;
    const ts = {
      refresh_token: await joseJwt.signRefreshToken(userId),
      token: await joseJwt.signToken(userId),
    };
    return rsj(ts);
  } catch (error) {
    return rfj(error as Error);
  }
});

authRouter.post("/logout", async () => {
  return rsj({ ok: true });
});
