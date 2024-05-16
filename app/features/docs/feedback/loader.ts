import * as ds from "~/server/decorators";
import * as feedBackServices from "~/server/services/docs/feedback";
import type * as rrn from "@remix-run/node";
import * as utils from "~/server/utils";

import { forkJoin } from "rxjs";

export class AdminFeedbackLoader {
  @ds.checkLogin()
  async loader({ request, params }: rrn.LoaderFunctionArgs) {
    const result$ = forkJoin({
      total: feedBackServices.getFeedBackCount$(),
      list: feedBackServices.findFeedbackByPage$({
        page: Number(params.page ?? 1),
        pageSize: Number(params.pageSize ?? 10),
      }),
    });
    return utils.resp$(result$);
  }
}

export const loader = new AdminFeedbackLoader().loader;
