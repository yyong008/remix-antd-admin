// types
import type { LoaderFunctionArgs } from "@remix-run/node";

// remix
import { json, redirect } from "@remix-run/node";

// styles
import "~/styles/dashboard/analysis.css";

// libs
import { lastValueFrom } from "rxjs";

// db
import { getAnalysisData$ } from "~/__mock__/dashboard/analysis";

// services
import {
  destroySession,
  getSession,
  getUserId$,
} from "~/server/services/common/session";

// decorator
import { checkLogin } from "../../decorators/check-auth.decorator";

export class AdminDemoDashboardAnalysiscontroller {
  @checkLogin()
  static async loader({ request, params }: LoaderFunctionArgs) {
    const { lang } = params;
    const userId = await lastValueFrom(getUserId$(request));
    if (!userId) {
      console.error("No userID dashboard/analysis", userId);
      const session = await getSession(request.headers.get("Cookie"));
      return redirect("/" + lang + "/admin/login", {
        headers: {
          "Set-Cookie": await destroySession(session),
        },
      });
    }
    const analysisData = await lastValueFrom(getAnalysisData$());
    return json(analysisData);
  }
}
