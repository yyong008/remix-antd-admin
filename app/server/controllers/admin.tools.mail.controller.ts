// types
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

// remix
import { redirect } from "@remix-run/node";

// server
import {
  destroySession,
  getSession,
  getUserId$,
} from "~/server/services/common/session";
import { sendMail } from "~/server/services/tools/mail";

// decorator
import { checkLogin } from "../decorators/check-auth.decorator";

// rxjs
import { lastValueFrom } from "rxjs";

export class AdminToolsMailsController {
  @checkLogin()
  static async loader({ request, params }: LoaderFunctionArgs) {
    const userId = await lastValueFrom(getUserId$(request));
    const session = await getSession(request.headers.get("Cookie"));
    if (!userId) {
      return redirect(`/${params.lang!}/admin/login`, {
        headers: {
          "Set-Cookie": await destroySession(session),
        },
      });
    }

    return null;
  }

  @checkLogin()
  static async action({ request, params }: ActionFunctionArgs) {
    const userId = await lastValueFrom(getUserId$(request));
    const session = await getSession(request.headers.get("Cookie"));
    if (!userId) {
      return redirect(`/${params.lang!}/admin/login`, {
        headers: {
          "Set-Cookie": await destroySession(session),
        },
      });
    }
    const data = await request.json();
    const info: any = await sendMail({
      host: data.host,
      port: data.port,
      auth: {
        user: data.user,
        pass: data.pass,
      },
      from: data.from, // 发送者昵称和地址
      to: data.to, // 接收者的邮箱地址
      subject: data.subject, // 邮件主题
      // text: string, //邮件的text
      html: data.html, //也可以用html发送
    } as any);
    if (info.messageId) {
      //
    } else {
      console.log(info);
    }
    return null;
  }
}
