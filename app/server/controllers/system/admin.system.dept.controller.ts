// remix
import { json } from "@remix-run/node";

// services
import { getDeptListTree } from "~/server/services/system/dept";

// utils
import { checkLogin } from "../../decorators/check-auth.decorator";

export class AdminAdminSystemDeptController {
  @checkLogin()
  static async loader() {
    return json({
      dataSource: await getDeptListTree(),
    });
  }

  @checkLogin()
  static async action() {}
}
