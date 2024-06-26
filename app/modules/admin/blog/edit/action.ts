import * as blogServices from "~/services/blog";
import * as ds from "~/decorators";
import type * as rrn from "@remix-run/node";
import * as schemas from "~/schema";
import * as serverUtils from "~/utils/server";
import * as sessionServices from "~/lib/session";

import { forkJoin, switchMap } from "rxjs";

import { blogPermissions } from "~/constants/permission";

interface AdminBlogEditActionInterface {
  action(actionArgs: rrn.ActionFunctionArgs): any;
  POST(actionArgs: rrn.ActionFunctionArgs): any;
  PUT(actionArgs: rrn.ActionFunctionArgs): any;
  // DELETE(actionArgs: rrn.ActionFunctionArgs): any;
}

type TM = keyof Omit<AdminBlogEditActionInterface, "action">;

export class AdminBlogEditAction {
  action(actionArgs: rrn.ActionFunctionArgs) {
    return this?.[actionArgs.request.method as TM]?.(actionArgs);
  }

  @ds.authorize()
  @ds.permission(blogPermissions.CREATE)
  @ds.validate(schemas.CreateBlogSchema)
  async POST({ request }: rrn.ActionFunctionArgs) {
    const result$ = forkJoin({
      data: request.json(),
      userId: sessionServices.getUserId$(request),
    }).pipe(switchMap((data) => blogServices.createBlog$(data)));

    return serverUtils.resp$(result$);
  }

  @ds.authorize()
  @ds.permission(blogPermissions.UPDATE)
  @ds.validate(schemas.UpdateBlogSchema)
  async PUT({ request }: rrn.ActionFunctionArgs) {
    const result$ = forkJoin({
      data: request.json(),
      userId: sessionServices.getUserId$(request),
    }).pipe(switchMap((data) => blogServices.updateBlog$(data)));

    return serverUtils.resp$(result$);
  }
}

export const action = new AdminBlogEditAction().action;
