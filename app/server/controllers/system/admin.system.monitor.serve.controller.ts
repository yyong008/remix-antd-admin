// types
import type * as rrn from "@remix-run/node";

// decorators
import * as ds from "~/server/decorators";

// utils
import { getSystemInfo$ } from "~/server/services/common/systemInfo";

// decorator
import { checkLogin } from "../../decorators/check-auth.decorator";

// utils
import * as serviceUtils from "~/server/utils";

export class AdminSystemMonitorServeController {
  @ds.Loader
  static async loader({ request, params }: rrn.LoaderFunctionArgs) {}

  @ds.Action
  static async action({ request, params }: rrn.ActionFunctionArgs) {}

  @checkLogin()
  static async get() {
    return serviceUtils.resp$(getSystemInfo$());
  }

  @checkLogin()
  static async post() {
    return null;
  }
}
