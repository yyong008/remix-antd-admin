// types
// import type { LoaderFunction, MetaFunction } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";

// libs
import { lastValueFrom } from "rxjs";

// services
import { getObesityData$ } from "~/__mock__/health/obesity";

// config
import { checkLogin } from "../decorators/check-auth.decorator";

export class AdminDemoHealthHandController {
  @checkLogin()
  static async loader() {
    const data = await lastValueFrom(getObesityData$());
    return json(data);
  }
}
