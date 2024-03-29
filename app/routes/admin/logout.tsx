// types
import type { ActionFunctionArgs } from "@remix-run/node";

// config
import { defaultLang } from "~/config/lang";

// services
import { logout } from "~/services/common/auth.server";

// remix:action
export const action = async ({ request, params }: ActionFunctionArgs) => {
  return logout(request, params.lang ?? defaultLang);
};
