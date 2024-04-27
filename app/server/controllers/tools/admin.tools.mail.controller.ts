// types
import type * as rrn from "@remix-run/node";

// decorators
import * as ds from "~/server/decorators";

// server
import * as toolsMailServices from "~/server/services/tools/mail";

// rxjs
import { from, map, of, switchMap } from "rxjs";

// utils
import * as utils from "~/server/utils";

export class AdminToolsMailsController {
  @ds.Loader
  static async loader({ request, params }: rrn.LoaderFunctionArgs) {}

  @ds.Action
  static async action({ request, params }: rrn.ActionFunctionArgs) {}

  @ds.checkLogin()
  static async get({ params }: rrn.LoaderFunctionArgs) {
    if (!params || !params.id) {
      return null;
    }
    const result$ = of(params.id).pipe(
      switchMap((id) => toolsMailServices.getEmailTemplateById$(Number(id))),
    );

    return utils.resp$(result$);
  }

  @ds.checkLogin()
  static async post({ request, params }: rrn.ActionFunctionArgs) {
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
        return toolsMailServices.sendMail$(data);
      }),
    );
    return utils.resp$(result$);
  }
}
