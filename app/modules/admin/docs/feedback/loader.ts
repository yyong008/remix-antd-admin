import * as ds from "~/decorators";
import * as feedBackServices from "~/services/docs/feedback";
import type * as rrn from "@remix-run/node";
import * as utils from "~/utils/server";

import { forkJoin } from "rxjs";

export class AdminFeedbackLoader {
  @ds.authorize()
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
