import * as ds from "~/server/decorators";
import * as roleSchemas from "~/schema/role.schema";
import type * as rrn from "@remix-run/node";
import * as serverUtils from "~/server/utils";
import * as systemRoleServices from "~/server/services/system/role";

import { from, switchMap } from "rxjs";

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

  @ds.validate(roleSchemas.CreateRoleSchema)
  async POST({ request }: rrn.ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((roleInfo) => from(systemRoleServices.addRole(roleInfo))),
    );

    return serverUtils.resp$(result$);
  }

  @ds.validate(roleSchemas.UpdateRoleSchema)
  async PUT({ request }: rrn.ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((roleInfo) => from(systemRoleServices.updateRole(roleInfo))),
    );

    return serverUtils.resp$(result$);
  }

  @ds.validate(roleSchemas.DeleteRoleSchema)
  async DELETE({ request, params }: rrn.ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap(({ ids }) => from(systemRoleServices.deleteRole(ids))),
    );

    return serverUtils.resp$(result$);
  }
}

export const action = new Action().action;
