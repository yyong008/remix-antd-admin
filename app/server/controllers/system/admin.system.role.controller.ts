import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

// services
import {
  addRole,
  deleteRole,
  updateRole,
  getRoleList,
  getMenuRoles,
} from "~/server/services/system/role";
import { getFlatMenu } from "~/server/services/system/menu-role";

// rxjs
import { forkJoin, from, lastValueFrom, switchMap } from "rxjs";

// decoartor
import { checkLogin } from "../../decorators/check-auth.decorator";

import * as rp from "~/server/utils";
import { validate } from "../../decorators/validate-schema";

// schema
import {
  CreateRoleSchema,
  DeleteRoleSchema,
  UpdateRoleSchema,
} from "~/schema/role.schema";

export class AdminSystemRoleController {
  @checkLogin()
  static async action({ request }: ActionFunctionArgs) {
    switch (request.method) {
      case "POST":
        return AdminSystemRoleController.post({
          request,
        } as ActionFunctionArgs);

      case "PUT":
        return AdminSystemRoleController.put({ request } as ActionFunctionArgs);

      case "DELETE":
        return AdminSystemRoleController.delete({
          request,
        } as ActionFunctionArgs);

      default:
        return rp.respFailJson({});
    }
  }

  @checkLogin()
  static async loader({ request }: LoaderFunctionArgs) {
    const result$ = forkJoin({
      dataSource: from(getRoleList()),
      flatMenu: from(getFlatMenu()),
      menuRoles: from(getMenuRoles()),
    });

    const data = await lastValueFrom(result$);
    return data ? rp.respSuccessJson(data) : rp.respFailJson({});
  }

  @validate(CreateRoleSchema)
  static async post({ request }: ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((roleInfo) => from(addRole(roleInfo))),
    );

    const data = await lastValueFrom(result$);
    return data ? rp.respSuccessJson(data) : rp.respFailJson({});
  }

  @validate(UpdateRoleSchema)
  static async put({ request }: ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((roleInfo) => from(updateRole(roleInfo))),
    );

    const data = await lastValueFrom(result$);
    return data ? rp.respSuccessJson(data) : rp.respFailJson({});
  }

  @validate(DeleteRoleSchema)
  static async delete({ request, params }: ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap(({ ids }) => from(deleteRole(ids))),
    );

    const data: any = await lastValueFrom(result$);
    return data ? rp.respSuccessJson(data) : rp.respFailJson({});
  }
}
