import type * as rrn from "@remix-run/node";
import { type TRegister } from "~/schema/login.schema";
import { json, redirect } from "@remix-run/node";
import { findByUserName } from "~/services/login";
import { createUserFromRegister } from "~/services/register";

import { hashPassword } from "~/utils/server";
import { destroySession, getSession } from "~/lib/session";

import { RegisterSchema } from "~/schema/login.schema";

interface AdminNewsCategoryActionInterface {
  action(actionArgs: rrn.ActionFunctionArgs): any;
  POST(actionArgs: rrn.ActionFunctionArgs): any;
  // PUT(actionArgs: rrn.ActionFunctionArgs): any;
  // DELETE(actionArgs: rrn.ActionFunctionArgs): any;
}

type TM = keyof Omit<AdminNewsCategoryActionInterface, "action">;

class Action {
  async action(actionArgs: rrn.ActionFunctionArgs) {
    return this?.[actionArgs.request.method as TM]?.(actionArgs);
  }

  async POST({ request, params }: rrn.ActionFunctionArgs) {
    const session = await getSession(request.headers.get("Cookie"));
    const { lang } = params || "zh-CN";

    const dataDto = await request.json();
    let validateDataDto: TRegister;
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
    const user = await findByUserName(validateDataDto.username);
    if (user) {
      return json({
        code: -1,
        data: {},
        message: "用户已存在",
      });
    }

    const newUser = await createUserFromRegister({
      username: validateDataDto.username,
      password: hashPassword(validateDataDto.password),
    });
    session.set("userId", newUser.id);

    return redirect("/" + lang + "/admin/login", {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  }
}

export const action = new Action().action;
