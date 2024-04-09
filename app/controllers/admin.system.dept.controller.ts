// types
import type { LoaderFunctionArgs } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";

// docorator
import { checkLogin } from "~/server/decorators/check-auth.decorator";

// services
import { getDeptListTree } from "~/server/services/system/dept";

export class AdminSystemDeptController {
  @checkLogin()
  static async loader(_: LoaderFunctionArgs) {
    return json({
      dataSource: await getDeptListTree(),
    });
  }
}
