// types
// import type { LoaderFunction, MetaFunction } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";

// libs
import { lastValueFrom } from "rxjs";

// db
import { getVisionData$ } from "~/__mock__/health/vision";

// config
import { checkLogin } from "../decorators/check-auth.decorator";

export class AdminDemoHealthVisionController {
  @checkLogin()
  static async loader() {
    const data = await lastValueFrom(getVisionData$());
    return json(data);
  }
}
