import * as ds from "~/decorators";
import * as linkCategoryServices from "~/services/profile/link-category";
import type * as rrn from "@remix-run/node";
import * as utils from "~/utils/server";

import { forkJoin, from, switchMap } from "rxjs";

import { getUserId$ } from "~/lib/session";

// const profilePerms = {
//   READ_LIST: "profile:link-category:list",
//   CREATE: "profile:link-category:create",
// };

interface AdminLinkCategoryActionInterface {
  action(actionArgs: rrn.ActionFunctionArgs): any;
  POST(actionArgs: rrn.ActionFunctionArgs): any;
  PUT(actionArgs: rrn.ActionFunctionArgs): any;
  DELETE(actionArgs: rrn.ActionFunctionArgs): any;
}

type TM = keyof Omit<AdminLinkCategoryActionInterface, "action">;

export class Action {
  async action(actionArgs: rrn.ActionFunctionArgs) {
    return this?.[actionArgs.request.method as TM]?.(actionArgs);
  }

  @ds.authorize()
  async POST({ request }: rrn.ActionFunctionArgs) {
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

  @ds.authorize()
  async PUT({ request }: rrn.ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((data) => linkCategoryServices.updateLinkCategory$(data)),
    );

    return utils.resp$(result$);
  }

  @ds.authorize()
  async DELETE({ request }: rrn.ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((ids: number[]) =>
        linkCategoryServices.deleteLinkCategoryByIds$(ids),
      ),
    );

    return utils.resp$(result$);
  }
}

export const action = new Action().action;
