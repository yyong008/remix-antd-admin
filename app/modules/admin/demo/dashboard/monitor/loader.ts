import { destroySession, getSession, getUserId$ } from "~/lib/session";
import { json, redirect } from "@remix-run/node";

import type { LoaderFunctionArgs } from "@remix-run/node";
import { getMonitorData$ } from "~/__mock__/dashboard/monitor";
import { lastValueFrom } from "rxjs";

// remix:loader
export const loader = async ({ request, params }: LoaderFunctionArgs) => {
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
};
