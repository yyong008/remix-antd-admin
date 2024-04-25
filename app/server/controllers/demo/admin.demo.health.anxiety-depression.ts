// types
import type { LoaderFunction } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";

// libs
import { lastValueFrom } from "rxjs";

// services
import { getDiseaseData$ } from "~/__mock__/health/anxiety-depression";

// decorator
import { checkLogin } from "../../decorators/check-auth.decorator";

// remix:loader
export const loader: LoaderFunction = async () => {};

export class AdminDemoHealthAnxietyDepressionController {
  @checkLogin()
  static async loader() {
    const data = await lastValueFrom(getDiseaseData$());
    return json(data);
  }
}
