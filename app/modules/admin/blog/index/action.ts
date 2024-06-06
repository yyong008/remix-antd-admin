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

import { blogPermissions } from "~/server/permission";
import { getUserId$ } from "~/server/services/common/session";

interface BlogActionInterface {
  action(actionArgs: rrn.ActionFunctionArgs): any;
  POST(actionArgs: rrn.ActionFunctionArgs): any;
  PUT(actionArgs: rrn.ActionFunctionArgs): any;
  DELETE(actionArgs: rrn.ActionFunctionArgs): any;
}

type TM = keyof Omit<BlogActionInterface, "action">;

export class BlogAction implements BlogActionInterface {
  async action(actionArgs: rrn.ActionFunctionArgs) {
    return this?.[actionArgs.request.method as TM]?.(actionArgs);
  }
  @ds.checkLogin()
  @ds.permission(blogPermissions.CREATE)
  @ds.validate(schemas.CreateBlogSchema)
  async POST({ request }: rrn.ActionFunctionArgs) {
    const result$ = forkJoin({
      data: request.json(),
      userId: getUserId$(request),
    }).pipe(switchMap((data) => createBlog$(data)));

    return serverUtils.resp$(result$);
  }

  @ds.checkLogin()
  @ds.permission(blogPermissions.UPDATE)
  @ds.validate(schemas.UpdateBlogSchema)
  async PUT({ request }: rrn.ActionFunctionArgs) {
    const result$ = forkJoin({
      data: request.json(),
      userId: getUserId$(request),
    }).pipe(switchMap((data) => updateBlog$(data)));

    return serverUtils.resp$(result$);
  }

  @ds.checkLogin()
  @ds.permission(blogPermissions.DELETE)
  @ds.validate(schemas.DeleteBlogSchema)
  async DELETE({ request }: rrn.ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap(({ ids }) => deleteManyBlogByIds$(ids)),
    );

    return serverUtils.resp$(result$);
  }
}

export const action = new BlogAction().action;
