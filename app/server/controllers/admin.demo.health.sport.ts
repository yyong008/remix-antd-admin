// types
// import type { LoaderFunction, MetaFunction } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";

// libs
import { lastValueFrom } from "rxjs";

// db
import { getSportData$ } from "~/__mock__/health/sport";

// decorator
import { checkLogin } from "../decorators/check-auth.decorator";

export class AdminDemoHealthSportController {
  @checkLogin()
  static async loader() {
    const data = await lastValueFrom(getSportData$());
    return json(data);
  }
}
