// types
import type * as rrn from "@remix-run/node";

// decorators
import * as ds from "~/server/decorators";

// utils
import * as serverUtils from "~/server/utils";

// service
import * as systemDictServices from "~/server/services/system/dict";

// rxjs
import { from } from "rxjs";

export class AdminSystemDictController {
  @ds.Loader
  static async loader({ request, params }: rrn.LoaderFunctionArgs) {}

  @ds.Action
  static async action({ request, params }: rrn.ActionFunctionArgs) {}

  @ds.checkLogin()
  static async get() {
    const result$ = from(systemDictServices.getDictList());
    return serverUtils.resp$(result$);
  }

  @ds.checkLogin()
  static async post() {
    return null;
  }
}
