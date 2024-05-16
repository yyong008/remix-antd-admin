import * as ds from "~/server/decorators";
import * as profileLinkServices from "~/server/services/profile/link";
import type * as rrn from "@remix-run/node";
import * as utils from "~/server/utils";

import { from } from "rxjs";

class Loader {
  @ds.checkLogin()
  async loader({ params }: rrn.LoaderFunctionArgs) {
    const { id } = params;
    const result$ = from(profileLinkServices.getLinkListById(Number(id)));
    return utils.resp$(result$);
  }
}

export const loader = new Loader().loader;
