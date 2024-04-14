// types
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";

// service
import {
  createMenu,
  deleteMenu,
  getMenu,
  updateMenu,
} from "~/server/services/system/menu";
import {
  getMenuRaw,
  getTypeNotPermMenu,
} from "~/server/services/system/menu-role";
import i18n from "~/i18n/i18next.server";

// utils
import * as rp from "~/server/utils/response.json";

// schema
import { DeleteMenuSchema } from "~/schema/menu.schema";

// decoartor
import { checkLogin } from "../decorators/check-auth.decorator";
import { permission } from "../decorators/check-perm";
import { validate, validateMenuSchema } from "../decorators/validate-schema";
import { from, lastValueFrom, switchMap } from "rxjs";

const perms = {
  READ_LIST: "system:user:list",
  READ: "system:user:read",
  DELETE: "system:user:delete",
  UPDATE: "system:user:update",
  CREATE: "system:user:create",
};

export class AdminSystemMenuController {
  @checkLogin()
  @permission(perms.READ_LIST)
  static async loader({ params }: LoaderFunctionArgs) {
    const { lang } = params;
    let t = await i18n.getFixedT(lang!);
    return json({
      menu: await getMenu(t, lang!),
      menuRaw: await getMenuRaw(t, lang!),
      menuNotPerm: await getTypeNotPermMenu(t),
    });
  }

  @checkLogin()
  static async action({ request }: ActionFunctionArgs) {
    switch (request.method) {
      case "POST":
        return AdminSystemMenuController.post({
          request,
        } as ActionFunctionArgs);
      case "PUT":
        return AdminSystemMenuController.put({ request } as ActionFunctionArgs);
      case "DELETE":
        return AdminSystemMenuController.delete({
          request,
        } as ActionFunctionArgs);
      default:
        break;
    }
  }

  /**
   * 创建菜单
   */
  @permission(perms.CREATE)
  @validateMenuSchema("create")
  static async post({ request }: ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((data) => from(createMenu(data))),
    );

    const menu = await lastValueFrom(result$);
    return menu ? rp.respSuccessJson({}) : rp.respFailJson({});
  }

  /**
   * 更新菜单
   */
  @permission(perms.UPDATE)
  @validateMenuSchema("update")
  static async put({ request }: ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((data) => from(updateMenu(data))),
    );

    const menu = await lastValueFrom(result$);
    return menu ? rp.respSuccessJson({}) : rp.respFailJson({});
  }

  /**
   * 删除菜单
   */
  @permission(perms.DELETE)
  @validate(DeleteMenuSchema)
  static async delete({ request }: ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((data) => from(deleteMenu(data))),
    );

    const menu = await lastValueFrom(result$);
    return menu ? rp.respSuccessJson({}) : rp.respFailJson({});
  }
}
