import type * as rrn from "@remix-run/node";

import { getAccountSettingsData$ } from "~/__mock__/account/settings";
import { lastValueFrom } from "rxjs";

export async function query(args: rrn.LoaderFunctionArgs) {
  const data = await lastValueFrom(getAccountSettingsData$());
  return {
    data,
    provinces: [] as any[],
    cities: [],
  };
}
