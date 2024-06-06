// decorators
import * as ds from "~/server/decorators";
// services
import * as feedBackServices from "~/server/services/docs/feedback";
// types
import type * as rrn from "@remix-run/node";
// utils
import * as utils from "~/server/utils";

// rxjs
import { forkJoin, from, switchMap } from "rxjs";

import { getUserId$ } from "~/server/services/common/session";

interface AdminFeedbackActionInterface {
  action(actionArgs: rrn.ActionFunctionArgs): any;
  POST(actionArgs: rrn.ActionFunctionArgs): any;
  PUT(actionArgs: rrn.ActionFunctionArgs): any;
  DELETE(actionArgs: rrn.ActionFunctionArgs): any;
}

type TM = keyof Omit<AdminFeedbackActionInterface, "action">;

class AdminFeedbackAction {
  async action(actionArgs: rrn.ActionFunctionArgs) {
    return this?.[actionArgs.request.method as TM]?.(actionArgs);
  }
  @ds.checkLogin()
  async POST({ request, params }: rrn.ActionFunctionArgs) {
    const result$ = forkJoin({
      data: request.json(),
      userId: getUserId$(request),
    }).pipe(
      switchMap(({ data, userId }) =>
        feedBackServices.createFeedback$({ userId, ...data }),
      ),
    );
    return utils.resp$(result$);
  }

  @ds.checkLogin()
  async PUT({ request, params }: rrn.ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((data) => feedBackServices.updateFeedBackById$(data)),
    );
    return utils.resp$(result$);
  }

  @ds.checkLogin()
  async DELETE({ request, params }: rrn.ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((ids) => feedBackServices.deleteFeedBackByIds$(ids)),
    );
    return utils.resp$(result$);
  }
}

export const action = new AdminFeedbackAction().action;
