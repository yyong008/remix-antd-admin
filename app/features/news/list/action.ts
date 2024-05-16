import * as ds from "~/server/decorators";
import * as newsServices from "~/server/services/news/news";
import type * as rrn from "@remix-run/node";
import * as utils from "~/server/utils";

import { from, switchMap } from "rxjs";

interface AdminNewsListWithIdActionInterface {
  action(actionArgs: rrn.ActionFunctionArgs): any;
  POST(actionArgs: rrn.ActionFunctionArgs): any;
  PUT(actionArgs: rrn.ActionFunctionArgs): any;
  DELETE(actionArgs: rrn.ActionFunctionArgs): any;
}

type TM = keyof Omit<AdminNewsListWithIdActionInterface, "action">;

class AdminNewsAction {
  async action(actionArgs: rrn.ActionFunctionArgs) {
    return this?.[actionArgs.request.method as TM]?.(actionArgs);
  }

  @ds.checkLogin()
  async POST({ request, params }: rrn.ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((data) => newsServices.createNews$(data)),
    );
    return utils.resp$(result$);
  }

  @ds.checkLogin()
  async PUT({ request, params }: rrn.ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((data) => newsServices.updateNews$(data)),
    );
    return utils.resp$(result$);
  }

  @ds.checkLogin()
  async DELETE({ request, params }: rrn.ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((data) => newsServices.deleteNewsByIds$(data)),
    );
    return utils.resp$(result$);
  }
}

export const action = new AdminNewsAction().action;
