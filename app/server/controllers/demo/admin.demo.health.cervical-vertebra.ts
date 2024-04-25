// import type { LoaderFunction, MetaFunction } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";

// libs
import { lastValueFrom } from "rxjs";

// services
import { getCervicalData$ } from "~/__mock__/health/cervical-vertebra";

// config
import { checkLogin } from "../../decorators/check-auth.decorator";

export class AdminDemoHealthCervialVertebraController {
  @checkLogin()
  static async loader() {
    const data = await lastValueFrom(getCervicalData$());
    return json(data);
  }
}
