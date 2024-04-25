// types
import type { MetaFunction } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";

// libs
import { lastValueFrom } from "rxjs";

// services
import { gethandData$ } from "~/__mock__/health/hand";

// config
import { checkLogin } from "../../decorators/check-auth.decorator";

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "disease-hand" }];
};

export class AdminDemoHealthHandController {
  @checkLogin()
  static async loader() {
    const data = await lastValueFrom(gethandData$());
    return json(data);
  }
}
