import * as ds from "~/server/decorators";
import type * as rrn from "@remix-run/node";
import * as utils from "~/server/utils";

import { forkJoin, from, switchMap } from "rxjs";

import { getUserId$ } from "~/server/services/common/session";

interface AdminNewsEditActionInterface {
  action(actionArgs: rrn.ActionFunctionArgs): any;
  POST(actionArgs: rrn.ActionFunctionArgs): any;
  // PUT(actionArgs: rrn.ActionFunctionArgs): any;
  // DELETE(actionArgs: rrn.ActionFunctionArgs): any;
}

type TM = keyof Omit<AdminNewsEditActionInterface, "action">;

class AdminNewsEditAction {
  async action(actionArgs: rrn.ActionFunctionArgs) {
    return this?.[actionArgs.request.method as TM]?.(actionArgs);
  }

  @ds.checkLogin()
  async POST({ request, params }: rrn.ActionFunctionArgs) {
    const result$ = forkJoin({
      data: from(request.json()),
      userId: getUserId$(request),
    }).pipe(
      switchMap(({ data, userId }) =>
        from({
          ...data,
          userId,
          categoryId: data.newsId,
          publishedAt: data.date,
        }),
      ),
    );
    return utils.resp$(result$);
  }
}

export const action = new AdminNewsEditAction().action;
