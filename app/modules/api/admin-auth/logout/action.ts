import type { ActionFunctionArgs } from "@remix-run/node";
import { defaultLang } from "~/config/lang";
import { lastValueFrom } from "rxjs";
import { logout$ } from "~/lib/session";

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const restFn = await lastValueFrom(
    logout$(request, params.lang ?? defaultLang),
  );
  return restFn?.();
};
