// types
import type { ActionFunctionArgs } from "@remix-run/node";
import { lastValueFrom } from "rxjs";

// config
import { defaultLang } from "~/config/lang";

// services
import { logout$ } from "~/server/services/common/session";

// remix:action
export const action = async ({ request, params }: ActionFunctionArgs) => {
  const restFn = await lastValueFrom(
    logout$(request, params.lang ?? defaultLang),
  );
  return restFn?.();
};
