import * as ds from "~/server/decorators";
import * as profileLinkServices from "~/server/services/profile/link";
import type * as rrn from "@remix-run/node";
import * as utils from "~/server/utils";

import { from, switchMap } from "rxjs";

interface AdminLinkCategoryIdListActionInterface {
  action(actionArgs: rrn.ActionFunctionArgs): any;
  POST(actionArgs: rrn.ActionFunctionArgs): any;
  PUT(actionArgs: rrn.ActionFunctionArgs): any;
  DELETE(actionArgs: rrn.ActionFunctionArgs): any;
}

type TM = keyof Omit<AdminLinkCategoryIdListActionInterface, "action">;

class Action {
  async action(actionArgs: rrn.ActionFunctionArgs) {
    return this?.[actionArgs.request.method as TM]?.(actionArgs);
  }

  @ds.checkLogin()
  async POST({ request }: rrn.ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((data) => from(profileLinkServices.createLink(data))),
    );
    return utils.resp$(result$);
  }

  @ds.checkLogin()
  async PUT({ request }: rrn.ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((data) => from(profileLinkServices.updateLink$(data))),
    );
    return utils.resp$(result$);
  }

  @ds.checkLogin()
  async DELETE({ request }: rrn.ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((ids: number[]) =>
        from(profileLinkServices.deleteLinkByIds$(ids)),
      ),
    );
    return utils.resp$(result$);
  }
}

export const action = new Action().action;
