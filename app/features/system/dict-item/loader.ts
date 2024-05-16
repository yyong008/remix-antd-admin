import * as ds from "~/server/decorators";
import type * as rrn from "@remix-run/node";
import * as serverUtils from "~/server/utils";
import * as systemDictItemServies from "~/server/services/system/dict-item";

import { from } from "rxjs";
import { redirect } from "@remix-run/node";

class Loader {
  @ds.checkLogin()
  async loader({ params }: rrn.LoaderFunctionArgs) {
    const { id, lang } = params;
    if (!lang || !id) {
      return redirect(`/${lang}/admin/system/dict`);
    }
    const result$ = from(
      systemDictItemServies.getDictListByDictionaryId(Number(id)),
    );
    return serverUtils.resp$(result$);
  }
}

export const loader = new Loader().loader;
