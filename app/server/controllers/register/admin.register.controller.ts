// types
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import type { TRegister } from "~/schema/login.schema";

// remix
import { json, redirect } from "@remix-run/node";

// service
import { findByUserName } from "~/server/services/login";
import { createUserFromRegister } from "~/server/services/register";
import { createLoginLog } from "~/server/services/system/login-log";

// libs
import { getLoginInfo, hashPassword } from "~/server/utils";

// auth
import {
  commitSession,
  destroySession,
  getSession,
} from "~/server/services/common/session";

// schema
import { RegisterSchema, loginLogSchema } from "~/schema/login.schema";

// config
import { defaultLang } from "~/config/lang";

// decorator
import { checkLogin } from "../decorators/check-auth.decorator";

export class AdminRegisterController {
  @checkLogin()
  static async loader({ params, request }: LoaderFunctionArgs) {
    const lang = params.lang || defaultLang;
    const session = await getSession(request.headers.get("Cookie"));

    if (session.has("userId")) {
      return redirect("/" + lang + "/admin/dashboard", {
        headers: {
          "Set-Cookie": await destroySession(session),
        },
      });
    }

    const data = { error: session.get("error") };

    return json(data, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  @checkLogin()
  static async action({ request, params }: ActionFunctionArgs) {
    const session = await getSession(request.headers.get("Cookie"));
    const method = request.method;
    const { lang } = params || "zh-CN";

    if (method === "POST") {
      // 获取 dto
      const dataDto = await request.json();
      let validateDataDto: TRegister;
      // 校验 dto
      try {
        validateDataDto = RegisterSchema.parse(dataDto);
      } catch (error: any) {
        console.error(error);
        return json({
          code: -1,
          data: {},
          message: error.toString(),
        });
      }
      // 查找是否已经存在
      const user = await findByUserName(validateDataDto.username);
      if (user) {
        return json({
          code: -1,
          data: {},
          message: "用户已存在",
        });
      }

      // 创建普通权限用户
      const newUser = await createUserFromRegister({
        username: validateDataDto.username,
        password: hashPassword(validateDataDto.password),
      });
      // userId 写入 session
      session.set("userId", newUser.id);
      // 登录：写入日志流程
      const loginLog = await getLoginInfo(request);
      const validateLoginLog = loginLogSchema.parse({
        ...loginLog,
        name: newUser.name,
      });

      // 写入日志
      await createLoginLog({
        ...validateLoginLog,
      });

      return redirect("/" + lang + "/admin/login", {
        headers: {
          "Set-Cookie": await destroySession(session),
        },
      });
    }
  }
}
