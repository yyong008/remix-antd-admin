import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";

// services
import {
  getRoleList,
  getMenuRoles,
  handlePutAction,
  handlePostAction,
  getUserRolesById,
  handleDeleteAction,
} from "~/server/services/system/role";
import { getUserId$ } from "~/server/services/common/session";
import { getFlatMenu } from "~/server/services/system/menu-role";

// rxjs
import { lastValueFrom } from "rxjs";

// decoartor
import { checkLogin } from "../decorators/check-auth.decorator";

export class AdminSystemRoleController {
  @checkLogin()
  static async action({ request }: ActionFunctionArgs) {
    const { method } = request;
    if (method === "POST") {
      const roleInfo = await request.json();

      return handlePostAction(roleInfo);
    } else if (method === "PUT") {
      const roleInfo = await request.json();
      return handlePutAction(roleInfo);
    } else if (method === "DELETE") {
      const { ids } = await request.json();
      return handleDeleteAction(ids);
    }
    return json({ code: 1, message: "fail", data: {} });
  }

  @checkLogin()
  static async loader({ request }: LoaderFunctionArgs) {
    const userId = await lastValueFrom(getUserId$(request));
    return json({
      dataSource: await getRoleList(),
      flatMenu: await getFlatMenu(),
      roles: await getUserRolesById(userId!),
      menuRoles: await getMenuRoles(),
    });
  }
}
