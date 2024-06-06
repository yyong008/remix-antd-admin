import * as ds from "~/decorators";
import type * as rrn from "@remix-run/node";
import * as serviceUtils from "~/utils/server";
import * as systemUserServices from "~/services/system/user";
import * as userSchemas from "~/schema/user.schema";

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

  @ds.checkLogin()
  @ds.validate(userSchemas.userSchema)
  async POST({ request, params }: rrn.LoaderFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((data) => from(systemUserServices.createUser(data))),
    );

    return serviceUtils.resp$(result$);
  }

  @ds.checkLogin()
  @ds.validate(userSchemas.userUpdateSchema)
  async PUT({ request, params }: rrn.LoaderFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((data) =>
        from(systemUserServices.updateUserById(data.id, data)),
      ),
    );

    return serviceUtils.resp$(result$);
  }

  @ds.checkLogin()
  @ds.validate(userSchemas.deleteUserSchema)
  async DELETE({ request, params }: rrn.LoaderFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((ids) => from(systemUserServices.deleteUserByIds(ids))),
    );

    return serviceUtils.resp$(result$);
  }
}

export const action = new Action().action;
