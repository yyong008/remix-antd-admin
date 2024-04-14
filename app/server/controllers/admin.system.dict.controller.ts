// types
// import type { LoaderFunction } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";

// service
import { getDictList } from "~/server/services/system/dict";

// decorator
import { checkLogin } from "../decorators/check-auth.decorator";

export class AdminSystemDictController {
  @checkLogin()
  static async loader() {
    return json({
      dataSource: await getDictList(),
    });
  }

  @checkLogin()
  static async action() {
    return null;
  }
}
