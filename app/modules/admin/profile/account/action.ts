import * as ds from "~/server/decorators";
import type * as rrn from "@remix-run/node";
import * as sessionServices from "~/server/services/common/session";
import * as userServices from "~/server/services/system/user";
import * as utils from "~/server/utils";

import { from, switchMap } from "rxjs";

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
  @ds.checkLogin()
  async POST({ request }: rrn.ActionFunctionArgs) {
    const result$ = sessionServices
      .getUserId$(request)
      .pipe(
        switchMap(({ id, ...data }: any) =>
          from(userServices.updateUserById(id, data!)),
        ),
      );

    return utils.resp$(result$);
  }
}

export const action = new Action().action;
