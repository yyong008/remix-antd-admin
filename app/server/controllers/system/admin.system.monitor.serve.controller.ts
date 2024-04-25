// types

// remix
import { json } from "@remix-run/node";

// utils
import { getSystemInfo$ } from "~/server/services/common/systemInfo";

// decorator
import { checkLogin } from "../../decorators/check-auth.decorator";

// rxjs
import { lastValueFrom } from "rxjs";

export class AdminSystemMonitorServeController {
  @checkLogin()
  static async loader() {
    return json({
      dataSource: await lastValueFrom(getSystemInfo$()),
    });
  }

  @checkLogin()
  static async action() {
    return null;
  }
}
