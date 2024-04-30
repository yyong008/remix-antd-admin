// types
import type * as rrn from "@remix-run/node";

// decorators
import * as ds from "~/server/decorators";

// services
import * as systemUserServices from "~/server/services/system/user";
import * as systemRoleServices from "~/server/services/system/role";
import * as systemDeptServices from "~/server/services/system/dept";

// utils
import * as clientUtils from "~/utils";
import * as serviceUtils from "~/server/utils";

// schema
import * as userSchemas from "~/schema/user.schema";

// rxjs
import { forkJoin, from, switchMap } from "rxjs";

export default class AdminSystemUserController {
  @ds.Loader
  static async loader({ request, params }: rrn.LoaderFunctionArgs) {}

  @ds.Action
  static async action({ request, params }: rrn.ActionFunctionArgs) {}

  @ds.checkLogin()
  static async get({ request, params }: rrn.LoaderFunctionArgs) {
    const { page, pageSize, name, role } =
      await clientUtils.getPaginationByRequest(request);

    const result$ = forkJoin({
      total: from(
        systemUserServices.getUserCount({ page, pageSize, name, role }),
      ),
      dataSource: from(
        systemUserServices.getUserList({ page, pageSize, name, role }),
      ),
      roles: from(systemRoleServices.getRoleList()),
      depts: from(systemDeptServices.getDeptListTree()),
    });
    return serviceUtils.resp$(result$);
  }

  @ds.checkLogin()
  @ds.validate(userSchemas.userSchema)
  static async post({ request, params }: rrn.LoaderFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((data) => from(systemUserServices.createUser(data))),
    );

    return serviceUtils.resp$(result$);
  }

  @ds.checkLogin()
  @ds.validate(userSchemas.userUpdateSchema)
  static async put({ request, params }: rrn.LoaderFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((data) =>
        from(systemUserServices.updateUserById(data.id, data)),
      ),
    );

    return serviceUtils.resp$(result$);
  }

  @ds.checkLogin()
  @ds.validate(userSchemas.deleteUserSchema)
  static async delete({ request, params }: rrn.LoaderFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((ids) => from(systemUserServices.deleteUserByIds(ids))),
    );

    return serviceUtils.resp$(result$);
  }
}
