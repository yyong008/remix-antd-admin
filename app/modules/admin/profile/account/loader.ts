import * as ds from "~/decorators";
import type * as rrn from "@remix-run/node";
import * as sessionServices from "~/lib/session";
import * as userServices from "~/services/system/user";
import * as utils from "~/utils/server";

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
