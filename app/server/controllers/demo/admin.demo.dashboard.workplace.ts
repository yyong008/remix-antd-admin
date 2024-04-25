// type
import type { LoaderFunctionArgs } from "@remix-run/node";

// remix
import { json, redirect } from "@remix-run/node";

// styles
import "~/styles/dashboard/workplace.css";

// libs
import { lastValueFrom } from "rxjs";

// db
import { getWorkplaceData$ } from "~/__mock__/dashboard/workplace";

// server
import {
  destroySession,
  getSession,
  getUserId$,
} from "~/server/services/common/session";

// decorator
import { checkLogin } from "../../decorators/check-auth.decorator";

export class AdmindemoDashboardWorkplaceController {
  @checkLogin()
  static async loader({ request, params }: LoaderFunctionArgs) {
    const { lang } = params;
    const session = await getSession(request.headers.get("Cookie"));
    const userId = await lastValueFrom(getUserId$(request));

    if (!userId) {
      return redirect("/" + lang + "/login", {
        headers: {
          "Set-Cookie": await destroySession(session),
        },
      });
    }
    const data = await lastValueFrom(getWorkplaceData$());
    return json(data);
  }
}
