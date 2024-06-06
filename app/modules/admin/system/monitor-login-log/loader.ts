import * as ds from "~/decorators";
import type * as rrn from "@remix-run/node";
import * as serviceUtils from "~/utils/server";
import * as systemLoginlogServices from "~/services/system/login-log";

import { forkJoin, from } from "rxjs";

class Loader {
  @ds.checkLogin()
  async loader({ request }: rrn.LoaderFunctionArgs) {
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
}

export const loader = new Loader().loader;
