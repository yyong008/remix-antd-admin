// types
import type * as rrn from "@remix-run/node";

// config
import { defaultLang } from "~/config/lang";

// services
import { logout$ } from "~/server/services/common/session";

// rxjs
import { lastValueFrom } from "rxjs";

// decorators
import * as ds from "~/server/decorators";

export class AdminLogoutController {
  @ds.Action
  static async action({ request, params }: rrn.ActionFunctionArgs) {}

  @ds.checkLogin()
  static async post({ request, params }: rrn.ActionFunctionArgs) {
    const logout = await lastValueFrom(
      logout$(request, params.lang ?? defaultLang),
    );

    return logout();
  }
}
