// types
import type { LoaderFunctionArgs } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";

// utils
import { getSystemInfo$ } from "~/server/services/common/systemInfo";

// rxjs
import { lastValueFrom } from "rxjs";

// decorator
import { checkLogin } from "~/server/decorators/check-auth.decorator";

export class AdminSystemMonitorServe {
  @checkLogin()
  static async loader(_: LoaderFunctionArgs) {
    return json({
      dataSource: await lastValueFrom(getSystemInfo$()),
    });
  }
}
