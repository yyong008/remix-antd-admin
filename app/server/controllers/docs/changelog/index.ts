// types
import type * as rrn from "@remix-run/node";

// services
import * as changeLogServices from "~/server/services/docs/change-log";

// decorators
import * as ds from "~/server/decorators";

// utils
import * as utils from "~/server/utils";

// rxjs
import { forkJoin, from, switchMap } from "rxjs";
import { getUserId$ } from "~/server/services/common/session";

export class AdminChangeLogController {
  @ds.Loader
  static async loader({ request, params }: rrn.LoaderFunctionArgs) {}

  @ds.Action
  static async action({ request, params }: rrn.ActionFunctionArgs) {}

  @ds.checkLogin()
  static async get({ request, params }: rrn.LoaderFunctionArgs) {
    // 新闻列表
    const result$ = forkJoin({
      total: changeLogServices.getChangeLogCount$(),
      list: changeLogServices.findChangeLogByPage$({
        page: Number(params.page ?? 1),
        pageSize: Number(params.pageSize ?? 10),
      }),
    });
    return utils.resp$(result$);
  }

  @ds.checkLogin()
  static async post({ request, params }: rrn.ActionFunctionArgs) {
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

  @ds.checkLogin()
  static async put({ request, params }: rrn.ActionFunctionArgs) {
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

  @ds.checkLogin()
  static async delete({ request, params }: rrn.ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap(({ ids }: { ids: number[] }) =>
        changeLogServices.deleteChangeLogByIds$(ids),
      ),
    );
    return utils.resp$(result$);
  }
}
