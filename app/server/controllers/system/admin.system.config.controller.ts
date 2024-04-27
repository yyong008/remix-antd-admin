// types
import type * as rrn from "@remix-run/node";

// decorators
import * as ds from "~/server/decorators";

// utils
import * as serverUtils from "~/server/utils";

export class AdminSystemConfigController {
  @ds.Loader
  static async loader({ request, params }: rrn.LoaderFunctionArgs) {}

  @ds.Action
  static async action({ request, params }: rrn.ActionFunctionArgs) {}

  @ds.checkLogin()
  static async get({ request, params }: rrn.LoaderFunctionArgs) {
    return serverUtils.resp([]);
  }

  @ds.checkLogin()
  static async post() {
    return null;
  }
}
