import * as ds from "~/decorators";
import * as loginLogServices from "~/services/system/login-log";
import type * as rrn from "@remix-run/node";
import * as sessionServices from "~/lib/session";
import * as singInLog from "~/services/sign-in/signInLog";
import * as utils from "~/utils/server";

import { forkJoin, from, switchMap } from "rxjs";

class AdminDashboardLoader {
  @ds.checkLogin()
  async loader({ request, params }: rrn.LoaderFunctionArgs) {
    const result$ = from(sessionServices.getUserId$(request)).pipe(
      switchMap((userId) =>
        forkJoin({
          isLogin: singInLog.getUserTodayIsSignInById$(userId!),
          latestLoginLog: loginLogServices.getLoginLogLatestByUserId(userId!),
        }),
      ),
    );

    return utils.resp$(result$);
  }
}

export const loader = new AdminDashboardLoader().loader;
