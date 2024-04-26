// type
import type * as rrn from "@remix-run/node";

// remix
import { forkJoin, from, switchMap } from "rxjs";

// decorators
import * as ds from "~/server/decorators";

// schemas
import * as schemas from "~/schema";

// services
import * as blogTagServices from "~/server/services/blog/blog-tags";
import * as sessionServices from "~/server/services/common/session";

// permissions
import { blogTagPermissions } from "~/server/permission";

// utils
import * as serverUtils from "~/server/utils";

export class AdminBlogTagController {
  @ds.Loader
  static async loader({ request, params }: rrn.LoaderFunctionArgs) {}

  @ds.Action
  static async action({ request, params }: rrn.ActionFunctionArgs) {}

  @ds.checkLogin()
  @ds.permission(blogTagPermissions.READ_LIST)
  static async get({ request, params }: rrn.LoaderFunctionArgs) {
    const result$ = sessionServices
      .getUserId$(request)
      .pipe(
        switchMap((userId) => blogTagServices.getBlogTagByUserId$(userId!)),
      );

    return serverUtils.resp$(result$);
  }

  @ds.checkLogin()
  @ds.permission(blogTagPermissions.CREATE)
  @ds.validate(schemas.CreateBlogTagSchema)
  static async post({ request }: rrn.ActionFunctionArgs) {
    const result$ = forkJoin({
      data: request.json(),
      userId: sessionServices.getUserId$(request),
    }).pipe(switchMap((data) => blogTagServices.createBlogTag$(data)));

    return serverUtils.resp$(result$);
  }

  @ds.checkLogin()
  @ds.permission(blogTagPermissions.UPDATE)
  @ds.validate(schemas.UpdateBlogTagSchema)
  static async put({ request }: rrn.ActionFunctionArgs) {
    const result$ = forkJoin({
      data: from(request.json()),
      userId: sessionServices.getUserId$(request),
    }).pipe(
      switchMap(({ data, userId }) =>
        blogTagServices.updateBlogTag$({
          ...data,
          userId,
        }),
      ),
    );

    return serverUtils.resp$(result$);
  }

  @ds.checkLogin()
  @ds.permission(blogTagPermissions.DELETE)
  @ds.validate(schemas.DeleteBlogTagSchema)
  static async delete({ request, params }: rrn.ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap(({ ids }) => blogTagServices.deleteBlogTagByIds$(ids)),
    );

    return serverUtils.resp$(result$);
  }
}
