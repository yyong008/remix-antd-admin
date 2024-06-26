import * as changeLogServices from "~/services/docs/change-log";
import * as ds from "~/decorators";
import type * as rrn from "@remix-run/node";
import * as utils from "~/utils/server";

import { forkJoin, from, switchMap } from "rxjs";

import { getUserId$ } from "~/libs/session";

interface AdminChangeLogActionInterface {
  action(actionArgs: rrn.ActionFunctionArgs): any;
  POST(actionArgs: rrn.ActionFunctionArgs): any;
  PUT(actionArgs: rrn.ActionFunctionArgs): any;
  DELETE(actionArgs: rrn.ActionFunctionArgs): any;
}

type TM = keyof Omit<AdminChangeLogActionInterface, "action">;

class AdminChangeLogAction {
  async action(actionArgs: rrn.ActionFunctionArgs) {
    return this?.[actionArgs.request.method as TM]?.(actionArgs);
  }

  @ds.authorize()
  async POST({ request, params }: rrn.ActionFunctionArgs) {
    const result$ = forkJoin({
      data: request.json(),
      userId: getUserId$(request),
    }).pipe(
      switchMap(({ userId, data }) =>
        changeLogServices.createChangeLog$({ userId, ...data }),
      ),
    );
    return utils.resp$(result$);
  }

  @ds.authorize()
  async PUT({ request, params }: rrn.ActionFunctionArgs) {
    const result$ = forkJoin({
      data: request.json(),
      userId: getUserId$(request),
    }).pipe(
      switchMap(({ userId, data }) =>
        changeLogServices.updateChangeLogById$({ userId, ...data }),
      ),
    );
    return utils.resp$(result$);
  }

  @ds.authorize()
  async DELETE({ request, params }: rrn.ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap(({ ids }: { ids: number[] }) =>
        changeLogServices.deleteChangeLogByIds$(ids),
      ),
    );
    return utils.resp$(result$);
  }
}

export const action = new AdminChangeLogAction().action;
