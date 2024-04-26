// type
import type * as rrn from "@remix-run/node";

// decorators
import * as ds from "~/server/decorators";

// schemas
import * as schemas from "~/schema";

// services
import * as blogServices from "~/server/services/blog";
import * as sessionServices from "~/server/services/common/session";

// rxjs
import { forkJoin, from, of, switchMap } from "rxjs";

// permissions
import { blogPermissions } from "~/server/permission";

// utils
import * as serverUtils from "~/server/utils";

/**
 * //新建/编辑/获取(没有删除,没有列表)
 */
export class AdminBlogEditController {
  @ds.Loader
  static async loader({ request, params }: rrn.LoaderFunctionArgs) {}

  @ds.Action
  static async action({ request, params }: rrn.ActionFunctionArgs) {}

  @ds.checkLogin()
  @ds.permission(blogPermissions.CREATE)
  static async get({ request, params }: rrn.LoaderFunctionArgs) {
    const result$ = from(sessionServices.getUserId$(request)).pipe(
      switchMap((userId) =>
        forkJoin({
          TINYMCE_KEY: of(process.env.TINYMCE_KEY!),
          blogCategory: blogServices.getAllBlogCategory$(),
          blogTag: blogServices.getBlogTagByUserId$(userId!),
        }),
      ),
    );

    return serverUtils.resp$(result$);
  }

  @ds.checkLogin()
  @ds.permission(blogPermissions.CREATE)
  @ds.validate(schemas.CreateBlogSchema)
  static async post({ request }: rrn.ActionFunctionArgs) {
    const result$ = forkJoin({
      data: request.json(),
      userId: sessionServices.getUserId$(request),
    }).pipe(switchMap((data) => blogServices.createBlog$(data)));

    return serverUtils.resp$(result$);
  }

  @ds.checkLogin()
  @ds.permission(blogPermissions.UPDATE)
  @ds.validate(schemas.UpdateBlogSchema)
  static async put({ request }: rrn.ActionFunctionArgs) {
    const result$ = forkJoin({
      data: request.json(),
      userId: sessionServices.getUserId$(request),
    }).pipe(switchMap((data) => blogServices.updateBlog$(data)));

    return serverUtils.resp$(result$);
  }
}
