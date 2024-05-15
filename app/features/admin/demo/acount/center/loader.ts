// types

import "react-advanced-cropper/dist/style.css";

import type { LoaderFunctionArgs } from "@remix-run/node";
import { getAccountSettingsData$ } from "~/__mock__/account/settings";
import { json } from "@remix-run/node";
import { lastValueFrom } from "rxjs";

// remix:loader
export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const data = await lastValueFrom(getAccountSettingsData$());
  return json({
    data,
    provinces: [] as any[],
    cities: [],
  });
};
