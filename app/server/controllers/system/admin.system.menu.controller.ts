// types
import type * as rrn from "@remix-run/node";

// decorators
import * as ds from "~/server/decorators";

// service
import * as systemMenuServices from "~/server/services/system/menu";
import * as systemMenuRoleServices from "~/server/services/system/menu-role";

// i18
import i18n from "~/i18n/i18next.server";

// utils
import * as serviceUtils from "~/server/utils";

// schema
import { DeleteMenuSchema } from "~/schema/menu.schema";

// decoartor
import { forkJoin, from, switchMap } from "rxjs";

const perms = {
  READ_LIST: "system:user:list",
  READ: "system:user:read",
  DELETE: "system:user:delete",
  UPDATE: "system:user:update",
  CREATE: "system:user:create",
};

export class AdminSystemMenuController {
  @ds.Loader
  static async loader({ request, params }: rrn.LoaderFunctionArgs) {}

  @ds.Action
  static async action({ request, params }: rrn.ActionFunctionArgs) {}

  @ds.checkLogin()
  @ds.permission(perms.READ_LIST)
  static async get({ params }: rrn.LoaderFunctionArgs) {
    const { lang } = params;
    let t = await i18n.getFixedT(lang!);

    const result$ = forkJoin({
      menu: from(systemMenuServices.getMenu(t, lang!)),
      menuRaw: from(systemMenuRoleServices.getMenuRaw(t, lang!)),
      menuNotPerm: from(systemMenuRoleServices.getTypeNotPermMenu(t)),
    });

    return serviceUtils.resp$(result$);
  }

  /**
   * 创建菜单
   */
  @ds.permission(perms.CREATE)
  @ds.validateMenuSchema("create")
  static async post({ request }: rrn.ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((data) => from(systemMenuServices.createMenu(data))),
    );

    return serviceUtils.resp$(result$);
  }

  /**
   * 更新菜单
   */
  @ds.permission(perms.UPDATE)
  @ds.validateMenuSchema("update")
  static async put({ request }: rrn.ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((data) => from(systemMenuServices.updateMenu(data))),
    );

    return serviceUtils.resp$(result$);
  }

  /**
   * 删除菜单
   */
  @ds.permission(perms.DELETE)
  @ds.validate(DeleteMenuSchema)
  static async delete({ request }: rrn.ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((data) => from(systemMenuServices.deleteMenu(data))),
    );

    return serviceUtils.resp$(result$);
  }
}
