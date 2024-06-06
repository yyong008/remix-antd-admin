import * as ds from "~/server/decorators";
import * as loginLogServices from "~/server/services/system/login-log";
import type * as rrn from "@remix-run/node";
import * as sessionServices from "~/server/services/common/session";
import * as singInLog from "~/server/services/sign-in/signInLog";
import * as utils from "~/server/utils";

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
