// types
import type { LoaderFunctionArgs } from "@remix-run/node";

// remix
import { json, redirect } from "@remix-run/node";

// db
import { getMonitorData$ } from "~/__mock__/dashboard/monitor";

// libs
import { lastValueFrom } from "rxjs";

// server
import {
  destroySession,
  getSession,
  getUserId$,
} from "~/server/services/common/session";

// decorator
import { checkLogin } from "../decorators/check-auth.decorator";

export class AdminDemoDashboardMonitorController {
  @checkLogin()
  static async loader({ request, params }: LoaderFunctionArgs) {
    const { lang } = params;
    const session = await getSession(request.headers.get("Cookie"));
    const userId = await lastValueFrom(getUserId$(request));

    if (!userId) {
      return redirect("/" + lang + "/admin/login", {
        headers: {
          "Set-Cookie": await destroySession(session),
        },
      });
    }
    const monitorData = await lastValueFrom(getMonitorData$());
    return json({ ...monitorData });
  }
}
