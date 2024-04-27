// types
import type * as rrn from "@remix-run/node";

// decorators
import * as ds from "~/server/decorators";

// utils
import * as serverUtils from "~/server/utils";

// services
import * as systemDeptServices from "~/server/services/system/dept";

// rxjs
import { from } from "rxjs";

export class AdminAdminSystemDeptController {
  @ds.Loader
  static async loader({ request, params }: rrn.LoaderFunctionArgs) {}

  @ds.Action
  static async action({ request, params }: rrn.ActionFunctionArgs) {}

  @ds.checkLogin()
  static async get() {
    const result$ = from(systemDeptServices.getDeptListTree());
    return serverUtils.resp$(result$);
  }

  @ds.checkLogin()
  static async post({ request, params }: rrn.ActionFunctionArgs) {}

  @ds.checkLogin()
  static async put({ request, params }: rrn.ActionFunctionArgs) {}

  @ds.checkLogin()
  static async delete({ request, params }: rrn.ActionFunctionArgs) {}
}
