// types
import type * as rrn from "@remix-run/node";

// decorators
import * as ds from "~/server/decorators";

// schemas
import * as schemas from "~/schema";

// services
import * as sessionServices from "~/server/services/common/session";
import * as blogCategoryServices from "~/server/services/blog/blog-category";

// utils
import * as serverUtils from "~/server/utils";

// rxjs
import { forkJoin, from, switchMap } from "rxjs";

// permissions
import { blogCategoryPermissions } from "~/server/permission";

export class AdminBlogCategoryController {
  @ds.Loader
  static async loader({ request, params }: rrn.LoaderFunctionArgs) {}

  @ds.Action
  static async action({ request, params }: rrn.ActionFunctionArgs) {}

  @ds.checkLogin()
  @ds.permission(blogCategoryPermissions.READ_LIST)
  // @ds.validate(schemas.GetBlogCategorySchema)
  static async get({ request, params }: rrn.LoaderFunctionArgs) {
    const result$ = sessionServices
      .getUserId$(request)
      .pipe(
        switchMap((userId) =>
          blogCategoryServices.getBlogCategoryByUserId$(userId!),
        ),
      );

    return serverUtils.resp$(result$);
  }

  @ds.checkLogin()
  @ds.permission(blogCategoryPermissions.CREATE)
  @ds.validate(schemas.CreateBlogCategorySchema)
  static async post({ request }: rrn.ActionFunctionArgs) {
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
  static async put({ request }: rrn.ActionFunctionArgs) {
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
  static async delete({ request }: rrn.ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((ids: number[]) =>
        blogCategoryServices.deleteBlogCategoryByIds$(ids),
      ),
    );

    return serverUtils.resp$(result$);
  }
}
