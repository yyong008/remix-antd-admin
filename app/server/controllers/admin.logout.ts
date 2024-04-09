// types
import type { ActionFunctionArgs } from "@remix-run/node";

// config
import { defaultLang } from "~/config/lang";

// services
import { logout$ } from "~/server/services/common/session";

// decorator
import { checkLogin } from "../decorators/check-auth.decorator";
import { lastValueFrom } from "rxjs";

export class AdminLogoutController {
  @checkLogin()
  static async action({ request, params }: ActionFunctionArgs) {
    const logout = await lastValueFrom(
      logout$(request, params.lang ?? defaultLang),
    );

    return logout();
  }
}
