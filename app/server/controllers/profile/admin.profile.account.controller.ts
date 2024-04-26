// types
import type * as rrn from "@remix-run/node";

// decorators
import * as ds from "~/server/decorators";

// server
import * as userServices from "~/server/services/system/user";
import * as sessionServices from "~/server/services/common/session";

// rxjs
import { from, switchMap } from "rxjs";

// utils
import * as utils from "~/server/utils";

export class AdminProfileAccountController {
  @ds.Loader
  static async loader({ request, params }: rrn.LoaderFunctionArgs) {}

  @ds.Action
  static async action({ request, params }: rrn.ActionFunctionArgs) {}

  @ds.checkLogin()
  static async get({ request }: rrn.LoaderFunctionArgs) {
    const result$ = sessionServices
      .getUserId$(request)
      .pipe(switchMap((userId) => from(userServices.getUserInfoById(userId!))));

    return utils.resp$(result$);
  }

  @ds.checkLogin()
  static async post({ request }: rrn.ActionFunctionArgs) {
    const result$ = sessionServices
      .getUserId$(request)
      .pipe(
        switchMap(({ id, ...data }: any) =>
          from(userServices.updateUserById(id, data!)),
        ),
      );

    return utils.resp$(result$);
  }
}
