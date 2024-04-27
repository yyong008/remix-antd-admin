// types
import type * as rrn from "@remix-run/node";

// decorators
import * as ds from "~/server/decorators";

// services
import * as systemRoleServices from "~/server/services/system/role";
import * as SystemMenuRoleServices from "~/server/services/system/menu-role";

// rxjs
import { forkJoin, from, lastValueFrom, switchMap } from "rxjs";

import * as serverUtils from "~/server/utils";

// schema
import * as roleSchemas from "~/schema/role.schema";

export class AdminSystemRoleController {
  @ds.Loader
  static async loader({ request, params }: rrn.LoaderFunctionArgs) {}

  @ds.Action
  static async action({ request, params }: rrn.ActionFunctionArgs) {}

  @ds.checkLogin()
  static async get({ request }: rrn.LoaderFunctionArgs) {
    const result$ = forkJoin({
      dataSource: from(systemRoleServices.getRoleList()),
      flatMenu: from(SystemMenuRoleServices.getFlatMenu()),
      menuRoles: from(systemRoleServices.getMenuRoles()),
    });

    const data = await lastValueFrom(result$);
    return data
      ? serverUtils.respSuccessJson(data)
      : serverUtils.respFailJson({});
  }

  @ds.validate(roleSchemas.CreateRoleSchema)
  static async post({ request }: rrn.ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((roleInfo) => from(systemRoleServices.addRole(roleInfo))),
    );

    return serverUtils.resp$(result$);
  }

  @ds.validate(roleSchemas.UpdateRoleSchema)
  static async put({ request }: rrn.ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((roleInfo) => from(systemRoleServices.updateRole(roleInfo))),
    );

    return serverUtils.resp$(result$);
  }

  @ds.validate(roleSchemas.DeleteRoleSchema)
  static async delete({ request, params }: rrn.ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap(({ ids }) => from(systemRoleServices.deleteRole(ids))),
    );

    return serverUtils.resp$(result$);
  }
}
