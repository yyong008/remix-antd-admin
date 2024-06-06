import * as blogCategoryServices from "~/services/blog/blog-category";
import * as ds from "~/decorators";
import type * as rrn from "@remix-run/node";
import * as schemas from "~/schema";
import * as serverUtils from "~/utils/server";
import * as sessionServices from "~/lib/session";

import { forkJoin, from, switchMap } from "rxjs";

import { blogCategoryPermissions } from "~/constants/permission";

interface BlogCategoryActionInterface {
  action(actionArgs: rrn.ActionFunctionArgs): any;
  POST(actionArgs: rrn.ActionFunctionArgs): any;
  PUT(actionArgs: rrn.ActionFunctionArgs): any;
  DELETE(actionArgs: rrn.ActionFunctionArgs): any;
}

type TM = keyof Omit<BlogCategoryActionInterface, "action">;

export class BlogCategoryAction implements BlogCategoryActionInterface {
  action(actionArgs: rrn.ActionFunctionArgs) {
    return this?.[actionArgs.request.method as TM]?.(actionArgs);
  }

  @ds.checkLogin()
  @ds.permission(blogCategoryPermissions.CREATE)
  @ds.validate(schemas.CreateBlogCategorySchema)
  async POST({ request }: rrn.ActionFunctionArgs) {
    const result$ = forkJoin({
      data: request.json(),
      userId: sessionServices.getUserId$(request),
    }).pipe(
      switchMap((data: any) => blogCategoryServices.createBlogCategory$(data)),
    );

    return serverUtils.resp$(result$);
  }

  @ds.checkLogin()
  @ds.permission(blogCategoryPermissions.UPDATE)
  @ds.validate(schemas.UpdateBlogCategorySchema)
  async PUT({ request }: rrn.ActionFunctionArgs) {
    const result$ = forkJoin({
      data: from(request.json()),
      userId: sessionServices.getUserId$(request),
    }).pipe(
      switchMap((data: any) => {
        return blogCategoryServices.updateBlogCategory$(data);
      }),
    );

    // const blogCategory = await firstValueFrom(result$);

    return serverUtils.resp$(result$);
  }

  @ds.checkLogin()
  @ds.permission(blogCategoryPermissions.DELETE)
  @ds.validate(schemas.DeleteBlogCategorySchema)
  async DELETE({ request }: rrn.ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((ids: number[]) =>
        blogCategoryServices.deleteBlogCategoryByIds$(ids),
      ),
    );

    return serverUtils.resp$(result$);
  }
}

export const action = new BlogCategoryAction().action;
