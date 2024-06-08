import * as ds from "~/decorators";
import * as linkCategoryServices from "~/services/profile/link-category";
import type * as rrn from "@remix-run/node";
import * as utils from "~/utils/server";

import { from, switchMap } from "rxjs";

import { getUserId$ } from "~/lib/session";

// const profilePerms = {
//   READ_LIST: "profile:link-category:list",
//   CREATE: "profile:link-category:create",
// };

class Loader {
  @ds.authorize()
  // @ds.permission(profilePerms.READ_LIST)
  async loader({ request }: rrn.LoaderFunctionArgs) {
    const result$ = from(getUserId$(request)).pipe(
      switchMap((userId) =>
        linkCategoryServices.getLinkCategoryListByUserId$(userId!),
      ),
    );

    return utils.resp$(result$);
  }
}

export const loader = new Loader().loader;
