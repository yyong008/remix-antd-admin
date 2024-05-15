import * as blogServices from "~/server/services/blog";
import * as ds from "~/server/decorators";
import type * as rrn from "@remix-run/node";
import * as schemas from "~/schema";
import * as serverUtils from "~/server/utils";
import * as sessionServices from "~/server/services/common/session";

import { forkJoin, switchMap } from "rxjs";

import { blogPermissions } from "~/server/permission";

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

  @ds.checkLogin()
  @ds.permission(blogPermissions.CREATE)
  @ds.validate(schemas.CreateBlogSchema)
  async POST({ request }: rrn.ActionFunctionArgs) {
    const result$ = forkJoin({
      data: request.json(),
      userId: sessionServices.getUserId$(request),
    }).pipe(switchMap((data) => blogServices.createBlog$(data)));

    return serverUtils.resp$(result$);
  }

  @ds.checkLogin()
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
