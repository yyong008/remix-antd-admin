import { getAccountSettingsData$ } from "~/__mock__/account/settings";
import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { lastValueFrom } from "rxjs";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const data = await lastValueFrom(getAccountSettingsData$());
  return json({
    data,
    provinces: [] as any[],
    cities: [],
  });
};
