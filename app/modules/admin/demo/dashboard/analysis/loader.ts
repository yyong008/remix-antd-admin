import {
  destroySession,
  getSession,
  getUserId$,
} from "~/server/services/common/session";
import { json, redirect } from "@remix-run/node";

import type { LoaderFunction } from "@remix-run/node";
import { getAnalysisData$ } from "~/__mock__/dashboard/analysis";
import { lastValueFrom } from "rxjs";

export const loader: LoaderFunction = async ({ request, params }) => {
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
};
