import type { LoaderFunctionArgs } from "@remix-run/node";
import { getMonitorData$ } from "~/__mock__/dashboard/monitor";
import { lastValueFrom } from "rxjs";

export async function query({ params, request }: LoaderFunctionArgs) {
  // const { lang } = params;
  // const session = await getSession(request.headers.get("Cookie"));
  // const userId = await lastValueFrom(getUserId$(request));

  // if (!userId) {
  //   return redirect("/" + lang + "/admin/login", {
  //     headers: {
  //       "Set-Cookie": await destroySession(session),
  //     },
  //   });
  // }
  const result = await lastValueFrom(getMonitorData$());
  return result;
}
