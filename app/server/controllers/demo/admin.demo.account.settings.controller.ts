// remix
import { json } from "@remix-run/node";

// styles
import "react-advanced-cropper/dist/style.css";

// libs
import { lastValueFrom } from "rxjs";

// service
import { getAccountSettingsData$ } from "~/__mock__/account/settings";

// decorator
import { checkLogin } from "../../decorators/check-auth.decorator";

export class AdminDemoAccoutSettingsController {
  @checkLogin()
  static async loader() {
    const data = await lastValueFrom(getAccountSettingsData$());
    return json({
      data,
      provinces: [] as any[],
      cities: [],
    });
  }
}
