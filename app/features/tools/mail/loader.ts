import * as ds from "~/server/decorators";
import type * as rrn from "@remix-run/node";
import * as toolsMailServices from "~/server/services/tools/mail";
import * as utils from "~/server/utils";

import { of, switchMap } from "rxjs";

class Loader {
  @ds.checkLogin()
  async loader({ params }: rrn.LoaderFunctionArgs) {
    if (!params || !params.id) {
      return null;
    }
    const result$ = of(params.id).pipe(
      switchMap((id) => toolsMailServices.getEmailTemplateById$(Number(id))),
    );

    return utils.resp$(result$);
  }
}

export const loader = new Loader().loader;
