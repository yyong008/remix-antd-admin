import * as ds from "~/decorators";
import type * as rrn from "@remix-run/node";
import * as toolsMailServices from "~/services/tools/mail";
import * as utils from "~/utils/server";

import { from, map, switchMap } from "rxjs";

export class Action {
  @ds.Action
  async action({ request, params }: rrn.ActionFunctionArgs) {}

  @ds.checkLogin()
  async POST({ request, params }: rrn.ActionFunctionArgs) {
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

export const action = new Action().action;
