// types
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

// server

import { getEmailTemplateById$, sendMail$ } from "~/server/services/tools/mail";

// decorator
import { checkLogin } from "../decorators/check-auth.decorator";

// rxjs
import { from, lastValueFrom, map, of, switchMap } from "rxjs";
import { respFailJson, respSuccessJson } from "../utils/response.json";

export class AdminToolsMailsController {
  @checkLogin()
  static async loader({ params }: LoaderFunctionArgs) {
    if (!params || !params.id) {
      return null;
    }
    const result$ = of(params.id).pipe(
      switchMap((id) => getEmailTemplateById$(Number(id))),
    );

    const result = await lastValueFrom(result$);

    return result ? respSuccessJson(result) : respFailJson({});
  }

  @checkLogin()
  static async action({ request, params }: ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      map(
        (data: any) =>
          ({
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
          }) as any,
      ),
      switchMap((data: any) => {
        return sendMail$(data);
      }),
    );
    const info = await lastValueFrom(result$);
    return info ? respSuccessJson(info) : respFailJson({});
  }
}
