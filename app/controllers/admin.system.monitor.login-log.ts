// types
import type { LoaderFunctionArgs } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";

import {
  getLoginLogList,
  loginLogCount,
} from "~/server/services/system/login-log";

// decorator
import { checkLogin } from "~/server/decorators/check-auth.decorator";

export class AdminSystemMonitorLoginLog {
  @checkLogin()
  static async loader({ request }: LoaderFunctionArgs) {
    let { searchParams } = new URL(request.url);
    let page = Number(searchParams.get("page") ?? 1);
    let pageSize = Number(searchParams.get("pageSize") ?? 10);
    let name = searchParams.get("name") ?? "";

    return json({
      count: await loginLogCount(),
      dataSource: await getLoginLogList({ page, pageSize, name }),
    });
  }
}
