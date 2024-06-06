import * as ds from "~/server/decorators";
import type * as rrn from "@remix-run/node";
import * as toolsStorageServices from "~/server/services/tools/storage";
import * as utils from "~/server/utils";

import { from, switchMap } from "rxjs";

class Action {
  @ds.Action
  async action({ request, params }: rrn.ActionFunctionArgs) {}

  @ds.checkLogin()
  async DETETE({ params, request }: rrn.LoaderFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((ids: number[]) =>
        toolsStorageServices.deleteStorageByIds$(ids),
      ),
    );

    return utils.resp$(result$);
  }
}

export const action = new Action().action;
