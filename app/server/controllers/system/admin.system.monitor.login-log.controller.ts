// types
import type * as rrn from "@remix-run/node";

// decorators
import * as ds from "~/server/decorators";

// services
import * as systemLoginlogServices from "~/server/services/system/login-log";

// rxjs
import { forkJoin, from } from "rxjs";

// utils
import * as serviceUtils from "~/server/utils";

export class AdminSystemMonitorLoginLogController {
  @ds.Loader
  static async loader({ request, params }: rrn.LoaderFunctionArgs) {}

  @ds.Action
  static async action({ request, params }: rrn.ActionFunctionArgs) {}

  @ds.checkLogin()
  static async get({ request }: rrn.LoaderFunctionArgs) {
    let { searchParams } = new URL(request.url);
    let page = Number(searchParams.get("page") ?? 1);
    let pageSize = Number(searchParams.get("pageSize") ?? 10);
    let name = searchParams.get("name") ?? "";

    const result$ = forkJoin({
      count: from(systemLoginlogServices.loginLogCount()),
      list: from(
        systemLoginlogServices.getLoginLogList({ page, pageSize, name }),
      ),
    });

    return serviceUtils.resp$(result$);
  }

  @ds.checkLogin()
  static async post() {
    return null;
  }
}
