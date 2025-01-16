import type { LoaderFunctionArgs } from "react-router";
import { getWorkplaceData$ } from "~/__mock__/dashboard/workplace";
import { lastValueFrom } from "rxjs";

export async function query({ params, request }: LoaderFunctionArgs) {
  // const { lang } = params;
  // const session = await getSession(request.headers.get("Cookie"));
  // const userId = await lastValueFrom(getUserId$(request));

  // if (!userId) {
  //   return redirect("/" + lang + "/login", {
  //     headers: {
  //       "Set-Cookie": await destroySession(session),
  //     },
  //   });
  // }
  const data = await lastValueFrom(getWorkplaceData$());
  return data;
}
