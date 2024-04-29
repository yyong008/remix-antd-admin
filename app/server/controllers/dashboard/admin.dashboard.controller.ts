// types
import type * as rrn from "@remix-run/node";

// decorators
import * as ds from "~/server/decorators";

import * as singInLog from "~/server/services/sign-in/signInLog";
import * as sessionServices from "~/server/services/common/session";

import { forkJoin, from, switchMap } from "rxjs";

import * as utils from "~/server/utils";

export class AdminDashboardController {
  @ds.Loader
  static async loader({ request, params }: rrn.LoaderFunctionArgs) {}

  static async get({ request, params }: rrn.LoaderFunctionArgs) {
    const result$ = from(sessionServices.getUserId$(request)).pipe(
      switchMap((userId) =>
        forkJoin({
          isLogin: singInLog.getUserTodayIsSignInById$(userId!),
        }),
      ),
    );

    return utils.resp$(result$);
  }
}
