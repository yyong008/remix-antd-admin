// types
import type * as rrn from "@remix-run/node";

// decorators
import * as ds from "~/server/decorators";

// server
import * as linkCategoryServices from "~/server/services/profile/link-category";
import { getUserId$ } from "~/server/services/common/session";

// rxjs
import { forkJoin, from, switchMap } from "rxjs";

// response
import * as utils from "~/server/utils";

const profilePerms = {
  READ_LIST: "profile:link-category:list",
  CREATE: "profile:link-category:create",
};

export class AdminProfileLinkCategoryController {
  @ds.Loader
  static async loader({ request, params }: rrn.LoaderFunctionArgs) {}

  @ds.Action
  static async action({ request, params }: rrn.ActionFunctionArgs) {}

  @ds.checkLogin()
  @ds.permission(profilePerms.READ_LIST)
  static async get({ request }: rrn.LoaderFunctionArgs) {
    const result$ = from(getUserId$(request)).pipe(
      switchMap((userId) =>
        linkCategoryServices.getLinkCategoryListByUserId$(userId!),
      ),
    );

    return utils.resp$(result$);
  }

  @ds.checkLogin()
  static async post({ request }: rrn.ActionFunctionArgs) {
    const result$ = forkJoin({
      data: from(request.json()),
      userId: getUserId$(request),
    }).pipe(
      switchMap(({ data, userId }) =>
        linkCategoryServices.createLinkCategory$({ ...data, userId }),
      ),
    );

    return utils.resp$(result$);
  }

  @ds.checkLogin()
  static async put({ request }: rrn.ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((data) => linkCategoryServices.updateLinkCategory$(data)),
    );

    return utils.resp$(result$);
  }

  @ds.checkLogin()
  static async delete({ request }: rrn.ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((ids: number[]) =>
        linkCategoryServices.deleteLinkCategoryByIds$(ids),
      ),
    );

    return utils.resp$(result$);
  }
}
