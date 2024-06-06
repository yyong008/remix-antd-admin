import * as changeLogServices from "~/services/docs/change-log";
import * as ds from "~/decorators";
import type * as rrn from "@remix-run/node";
import * as utils from "~/utils/server";

import { forkJoin } from "rxjs";

class AdminChangeLogLoader {
  @ds.checkLogin()
  async loader({ request, params }: rrn.LoaderFunctionArgs) {
    const result$ = forkJoin({
      total: changeLogServices.getChangeLogCount$(),
      list: changeLogServices.findChangeLogByPage$({
        page: Number(params.page ?? 1),
        pageSize: Number(params.pageSize ?? 10),
      }),
    });
    return utils.resp$(result$);
  }
}

export const loader = new AdminChangeLogLoader().loader;
