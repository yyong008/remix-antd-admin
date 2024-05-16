import * as ds from "~/server/decorators";
import * as newsCategoryServices from "~/server/services/news/news-category";
import type * as rrn from "@remix-run/node";
import * as utils from "~/server/utils";

import { from, switchMap } from "rxjs";

interface AdminNewsCategoryActionInterface {
  action(actionArgs: rrn.ActionFunctionArgs): any;
  POST(actionArgs: rrn.ActionFunctionArgs): any;
  PUT(actionArgs: rrn.ActionFunctionArgs): any;
  DELETE(actionArgs: rrn.ActionFunctionArgs): any;
}

type TM = keyof Omit<AdminNewsCategoryActionInterface, "action">;

class AdminNewsCategoryAction {
  async action(actionArgs: rrn.ActionFunctionArgs) {
    return this?.[actionArgs.request.method as TM]?.(actionArgs);
  }

  @ds.checkLogin()
  async POST({ request }: rrn.ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((data) => newsCategoryServices.createNewsCategory$(data)),
    );

    return utils.resp$(result$);
  }

  @ds.checkLogin()
  async PUT({ request }: rrn.ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((data) => newsCategoryServices.updateNewsCategory$(data)),
    );

    return utils.resp$(result$);
  }

  @ds.checkLogin()
  async DELETE({ request }: rrn.ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((ids: number[]) =>
        newsCategoryServices.deleteNewsCategoryByIds$(ids),
      ),
    );

    return utils.resp$(result$);
  }
}

export const action = new AdminNewsCategoryAction().action;
