import type { LoaderFunctionArgs } from "@remix-run/node";

// json
import { json } from "@remix-run/node";

// services
import { checkLogin } from "~/server/decorators/check-auth.decorator";

export class AboutController {
  @checkLogin()
  static async loader(_: LoaderFunctionArgs) {
    return json({
      dataSource: [],
    });
  }

  @checkLogin()
  static async action(_: LoaderFunctionArgs) {
    return json({
      dataSource: [],
    });
  }
}
