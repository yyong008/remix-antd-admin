// types
import type * as rrn from "@remix-run/node";

// decorators
import * as ds from "~/server/decorators";

// remix
import { redirect } from "@remix-run/node";

// service
import * as systemDictItemServies from "~/server/services/system/dict-item";

// rxjs
import { from } from "rxjs";

// utils
import * as serverUtils from "~/server/utils";

export class AdminSystemDictItemController {
  @ds.Loader
  static async loader({ request, params }: rrn.LoaderFunctionArgs) {}

  @ds.Action
  static async action({ request, params }: rrn.ActionFunctionArgs) {}

  @ds.checkLogin()
  static async get({ params }: rrn.LoaderFunctionArgs) {
    const { id, lang } = params;
    if (!lang || !id) {
      return redirect(`/${lang}/admin/system/dict`);
    }
    const result$ = from(
      systemDictItemServies.getDictListByDictionaryId(Number(id)),
    );
    return serverUtils.resp$(result$);
  }

  @ds.checkLogin()
  static async post() {
    return null;
  }
}
