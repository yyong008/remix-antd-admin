import * as ac from "./actions";
import * as as from "~/constants/actions";
import * as ds from "~/decorators";
import type * as rrn from "@remix-run/node";
import * as sc from "~/schema";
import * as us from "~/utils/server";

// import { mail as p } from "~/constants/permission";

class A {
  @ds.authorize()
  static async action(actionArgs: rrn.ActionFunctionArgs) {
    const _data = await actionArgs.request.json();
    const type = _data.type;
    try {
      if (type === as.ACTION_SEND_MAIL) return A.sendMail(actionArgs);
      return us.rsj({});
    } catch (error) {
      return us.rfj();
    }
  }

  // @ds.permission(p.CREATE)
  @ds.validate(sc.PostMailSchema)
  static async sendMail(args: rrn.ActionFunctionArgs) {
    const result = await ac.sendMail(args);
    return us.rsj(result);
  }
}

export const action = A.action;