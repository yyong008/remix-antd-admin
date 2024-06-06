import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { destroySession, getSession, getUserId$ } from "~/lib/session";
import { json, redirect } from "@remix-run/node";

import { getWorkplaceData$ } from "~/__mock__/dashboard/workplace";
import { lastValueFrom } from "rxjs";

export const meta: MetaFunction = () => {
  return [{ title: "dashboard-workplace" }];
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
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
};
