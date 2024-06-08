import * as ds from "~/decorators";
import * as profileLinkServices from "~/services/profile/link";
import type * as rrn from "@remix-run/node";
import * as utils from "~/utils/server";

import { from } from "rxjs";

class Loader {
  @ds.authorize()
  async loader({ params }: rrn.LoaderFunctionArgs) {
    const { id } = params;
    const result$ = from(profileLinkServices.getLinkListById(Number(id)));
    return utils.resp$(result$);
  }
}

export const loader = new Loader().loader;
