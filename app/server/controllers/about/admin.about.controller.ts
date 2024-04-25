import type * as rrn from "@remix-run/node";

// decorators
import * as ds from "~/server/decorators";

export class AdminAboutController {
  @ds.Loader
  static async loader({ request, params }: rrn.LoaderFunctionArgs) {}

  @ds.checkLogin()
  static async get({ request, params }: rrn.LoaderFunctionArgs) {
    return null;
  }
}
