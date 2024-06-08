import * as ds from "~/decorators";
import type * as rrn from "@remix-run/node";
import * as toolsMailServices from "~/services/tools/mail";
import * as utils from "~/utils/server";

import { of, switchMap } from "rxjs";

class Loader {
  @ds.authorize()
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
