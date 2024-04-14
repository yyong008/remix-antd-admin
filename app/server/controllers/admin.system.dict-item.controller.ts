// types
import type { LoaderFunctionArgs } from "@remix-run/node";

// remix
import { json, redirect } from "@remix-run/node";

// service
import { getDictListByDictionaryId } from "~/server/services/system/dict-item";

// decorators
import { checkLogin } from "../decorators/check-auth.decorator";

export class AdminSystemDictItemController {
  @checkLogin()
  static async loader({ params }: LoaderFunctionArgs) {
    const { id, lang } = params;
    if (!lang || !id) {
      return redirect(`/${lang}/admin/system/dict`);
    }
    return json({
      dataSource: await getDictListByDictionaryId(Number(id)),
    });
  }

  @checkLogin()
  static async action() {
    return null;
  }
}
