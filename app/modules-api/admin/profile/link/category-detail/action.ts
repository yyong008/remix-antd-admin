import * as ds from "~/decorators";
import * as profileLinkServices from "~/dals/profile/link";
import type * as rrn from "@remix-run/node";
import * as utils from "~/utils/server";

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

  @ds.authorize()
  async POST({ request }: rrn.ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((data) => from(profileLinkServices.createLink(data))),
    );
    return utils.resp$(result$);
  }

  @ds.authorize()
  async PUT({ request }: rrn.ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((data) => from(profileLinkServices.updateLink$(data))),
    );
    return utils.resp$(result$);
  }

  @ds.authorize()
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
