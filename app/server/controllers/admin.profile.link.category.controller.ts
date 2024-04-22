// types
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";

// server
import {
  createLinkCategory$,
  getLinkCategoryListByUserId$,
} from "~/server/services/profile/link-category";
import { getUserId$ } from "~/server/services/common/session";

// decorator
import { checkLogin } from "../decorators/check-auth.decorator";

// rxjs
import { forkJoin, from, lastValueFrom, switchMap } from "rxjs";

// decorators
import { permission } from "../decorators/check-perm";

// response
import * as rp from "~/server/utils";

const profilePerms = {
  READ_LIST: "profile:link-category:list",
  CREATE: "profile:link-category:create",
};

export class AdminProfileLinkCategoryController {
  @checkLogin()
  @permission(profilePerms.READ_LIST)
  static async loader({ request }: LoaderFunctionArgs) {
    const result$ = from(getUserId$(request)).pipe(
      switchMap((userId) => getLinkCategoryListByUserId$(userId!)),
    );
    const dataSource = await lastValueFrom(result$);
    return json({
      dataSource,
    });
  }

  @checkLogin()
  static async action({ request }: ActionFunctionArgs) {
    switch (request.method) {
      case "POST":
        return AdminProfileLinkCategoryController.post({
          request,
        } as ActionFunctionArgs);
      default:
        break;
    }
  }

  static async post({ request }: ActionFunctionArgs) {
    const result$ = forkJoin({
      data: from(request.json()),
      userId: getUserId$(request),
    }).pipe(
      switchMap(({ data, userId }) => createLinkCategory$({ ...data, userId })),
    );

    const linkCategory = await lastValueFrom(result$);
    if (linkCategory === null) {
      return rp.respFailJson({});
    }

    return rp.respSuccessJson(linkCategory);
  }
}
