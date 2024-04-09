// types
// import type { LoaderFunction, MetaFunction } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";

// services
import { checkLogin } from "~/server/decorators/check-auth.decorator";

export class AdminSystemConfigController {
  @checkLogin()
  static async loader() {
    return json({
      dataSource: [],
    });
  }
}
