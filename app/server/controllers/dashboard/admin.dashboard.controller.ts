// types
import type * as rrn from "@remix-run/node";

// decorators
import * as ds from "~/server/decorators";

// services
import * as singInLog from "~/server/services/sign-in/signInLog";
import * as sessionServices from "~/server/services/common/session";
import * as loginLogServices from "~/server/services/system/login-log";

// rxjs
import { forkJoin, from, switchMap } from "rxjs";

// utils
import * as utils from "~/server/utils";

export class AdminDashboardController {
  @ds.Loader
  static async loader({ request, params }: rrn.LoaderFunctionArgs) {}

  static async get({ request, params }: rrn.LoaderFunctionArgs) {
    const result$ = from(sessionServices.getUserId$(request)).pipe(
      switchMap((userId) =>
        forkJoin({
          isLogin: singInLog.getUserTodayIsSignInById$(userId!),
          latestLoginLog: loginLogServices.getLoginLogLatestByUserId(userId),
        }),
      ),
    );

    return utils.resp$(result$);
  }
}
