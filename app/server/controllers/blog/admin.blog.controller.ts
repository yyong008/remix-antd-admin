// types
import type * as rrn from "@remix-run/node";

// decorators
import * as ds from "~/server/decorators";

// schemas
import * as schemas from "~/schema";

// utils
import * as serverUtils from "~/server/utils";

// rxjs
import { forkJoin, from, of, switchMap } from "rxjs";

// permissions
import { blogPermissions } from "~/server/permission";

// services
import {
  createBlog$,
  deleteManyBlogByIds$,
  getBlogsListByIds$,
  updateBlog$,
} from "../../services/blog/blog";
import { getUserId$ } from "~/server/services/common/session";

import { getSearchParams } from "../../utils/utils";

import { getBlogCategoryById$ } from "../../services/blog/blog-category";
import { getBlogTagById$ } from "../../services/blog/blog-tags";

export class AdminBlogController {
  @ds.Loader
  static async loader({ request, params }: rrn.LoaderFunctionArgs) {}

  @ds.Action
  static async action({ request, params }: rrn.ActionFunctionArgs) {}

  @ds.checkLogin()
  @ds.permission(blogPermissions.READ_LIST)
  // @ds.validate(schemas.GetBlogSchema)
  static async get({ request }: rrn.LoaderFunctionArgs) {
    const result$ = forkJoin({
      userId: getUserId$(request),
      category: of(Number(getSearchParams(request, "category"))),
      tag: of(Number(getSearchParams(request, "tag"))),
    }).pipe(
      switchMap((data) => {
        return forkJoin({
          dataSource: getBlogsListByIds$(data.userId!, data.category, data.tag),
          category: getBlogCategoryById$(data.category),
          tag: getBlogTagById$(data.tag),
        });
      }),
    );

    return serverUtils.resp$(result$);
  }

  @ds.checkLogin()
  @ds.permission(blogPermissions.CREATE)
  @ds.validate(schemas.CreateBlogSchema)
  static async post({ request }: rrn.ActionFunctionArgs) {
    const result$ = forkJoin({
      data: request.json(),
      userId: getUserId$(request),
    }).pipe(switchMap((data) => createBlog$(data)));

    return serverUtils.resp$(result$);
  }

  @ds.checkLogin()
  @ds.permission(blogPermissions.UPDATE)
  @ds.validate(schemas.UpdateBlogSchema)
  static async put({ request }: rrn.ActionFunctionArgs) {
    const result$ = forkJoin({
      data: request.json(),
      userId: getUserId$(request),
    }).pipe(switchMap((data) => updateBlog$(data)));

    return serverUtils.resp$(result$);
  }

  @ds.checkLogin()
  @ds.permission(blogPermissions.DELETE)
  @ds.validate(schemas.DeleteBlogSchema)
  static async delete({ request }: rrn.ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap(({ ids }) => deleteManyBlogByIds$(ids)),
    );

    return serverUtils.resp$(result$);
  }
}
