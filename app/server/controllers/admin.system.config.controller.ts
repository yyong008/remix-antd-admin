// remix
import { json } from "@remix-run/node";
import { checkLogin } from "../decorators/check-auth.decorator";

export class AdminSystemConfigController {
  @checkLogin()
  static async loader() {
    return json({
      dataSource: [],
    });
  }

  @checkLogin()
  static async action() {
    return null;
  }
}
