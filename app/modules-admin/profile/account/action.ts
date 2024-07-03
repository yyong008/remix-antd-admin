import * as ds from "~/decorators";
import type * as rrn from "@remix-run/node";
import * as sessionServices from "~/libs/session";
import * as userServices from "~/dals/system/user";
import * as utils from "~/utils/server";

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
  @ds.authorize()
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
