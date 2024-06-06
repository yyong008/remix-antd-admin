import * as ds from "~/server/decorators";
import type * as rrn from "@remix-run/node";
import * as serviceUtils from "~/server/utils";
import * as systemMenuServices from "~/server/services/system/menu";

import { from, switchMap } from "rxjs";

import { DeleteMenuSchema } from "~/schema/menu.schema";

const perms = {
  READ_LIST: "system:user:list",
  READ: "system:user:read",
  DELETE: "system:user:delete",
  UPDATE: "system:user:update",
  CREATE: "system:user:create",
};

interface SystemConfigActionInterface {
  action(actionArgs: rrn.ActionFunctionArgs): any;
  POST(actionArgs: rrn.ActionFunctionArgs): any;
  PUT(actionArgs: rrn.ActionFunctionArgs): any;
  DELETE(actionArgs: rrn.ActionFunctionArgs): any;
}

type TM = keyof Omit<SystemConfigActionInterface, "action">;

class Action {
  async action(actionArgs: rrn.ActionFunctionArgs) {
    return this?.[actionArgs.request.method as TM]?.(actionArgs);
  }

  /**
   * 创建菜单
   */
  @ds.permission(perms.CREATE)
  @ds.validateMenuSchema("create")
  async POST({ request }: rrn.ActionFunctionArgs) {
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
  async PUT({ request }: rrn.ActionFunctionArgs) {
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
  async DELETE({ request }: rrn.ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((data) => from(systemMenuServices.deleteMenu(data))),
    );

    return serviceUtils.resp$(result$);
  }
}

export const action = new Action().action;
