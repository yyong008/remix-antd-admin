import { destroySession, getSession, getUserId$ } from "~/libs/session";

import type { LoaderFunctionArgs } from "@remix-run/node";
import { getAnalysisData$ } from "~/__mock__/dashboard/analysis";
import { lastValueFrom } from "rxjs";
import { redirect } from "@remix-run/node";

export async function query({ request, params }: LoaderFunctionArgs) {
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
  const result = await lastValueFrom(getAnalysisData$());
  return result;
}
