import * as ds from "~/server/decorators";
import type * as rrn from "@remix-run/node";
import * as schemas from "~/schema";
import * as serverUtils from "~/server/utils";

import {
  createBlog$,
  deleteManyBlogByIds$,
  updateBlog$,
} from "~/server/services/blog/blog";
import { forkJoin, from, switchMap } from "rxjs";

import { Action } from "~/utils/Action";
import { blogPermissions } from "~/server/permission";
import { getUserId$ } from "~/server/services/common/session";

export class BlogAction extends Action {
  @ds.checkLogin()
  @ds.permission(blogPermissions.CREATE)
  @ds.validate(schemas.CreateBlogSchema)
  static async POST({ request }: rrn.ActionFunctionArgs) {
    const result$ = forkJoin({
      data: request.json(),
      userId: getUserId$(request),
    }).pipe(switchMap((data) => createBlog$(data)));

    return serverUtils.resp$(result$);
  }

  @ds.checkLogin()
  @ds.permission(blogPermissions.UPDATE)
  @ds.validate(schemas.UpdateBlogSchema)
  static async PUT({ request }: rrn.ActionFunctionArgs) {
    const result$ = forkJoin({
      data: request.json(),
      userId: getUserId$(request),
    }).pipe(switchMap((data) => updateBlog$(data)));

    return serverUtils.resp$(result$);
  }

  @ds.checkLogin()
  @ds.permission(blogPermissions.DELETE)
  @ds.validate(schemas.DeleteBlogSchema)
  static async DELETE({ request }: rrn.ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap(({ ids }) => deleteManyBlogByIds$(ids)),
    );

    return serverUtils.resp$(result$);
  }
}

export const action = new BlogAction().action;
