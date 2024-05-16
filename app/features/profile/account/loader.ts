import * as ds from "~/server/decorators";
import type * as rrn from "@remix-run/node";
import * as sessionServices from "~/server/services/common/session";
import * as userServices from "~/server/services/system/user";
import * as utils from "~/server/utils";

import { from, switchMap } from "rxjs";

class Loader {
  @ds.checkLogin()
  async loader({ request }: rrn.LoaderFunctionArgs) {
    const result$ = sessionServices
      .getUserId$(request)
      .pipe(switchMap((userId) => from(userServices.getUserInfoById(userId!))));

    return utils.resp$(result$);
  }
}

export const loader = new Loader().loader;
