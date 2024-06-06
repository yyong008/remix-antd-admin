import * as ds from "~/server/decorators";
import * as linkCategoryServices from "~/server/services/profile/link-category";
import type * as rrn from "@remix-run/node";
import * as utils from "~/server/utils";

import { from, switchMap } from "rxjs";

import { getUserId$ } from "~/server/services/common/session";

// const profilePerms = {
//   READ_LIST: "profile:link-category:list",
//   CREATE: "profile:link-category:create",
// };

class Loader {
  @ds.checkLogin()
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
