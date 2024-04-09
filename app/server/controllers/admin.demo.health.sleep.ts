// types
// import type { LoaderFunction } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";

// libs
import { lastValueFrom } from "rxjs";

// db
import { getSleepData$ } from "~/__mock__/health/sleep";

// config
import { checkLogin } from "../decorators/check-auth.decorator";

export class AdminDemoHealthSleepController {
  @checkLogin()
  static async loader() {
    const data = await lastValueFrom(getSleepData$());
    return json(data);
  }
}
