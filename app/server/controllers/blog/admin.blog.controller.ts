// types
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

// services
import {
  createBlog$,
  deleteManyBlogByIds$,
  getBlogsListByIds$,
  updateBlog$,
} from "../../services/blog/blog";
import { getUserId$ } from "~/server/services/common/session";

// decorators
import { checkLogin } from "../../decorators/check-auth.decorator";
import { permission } from "../../decorators/check-perm";
import { validate } from "../../decorators/validate-schema";

import { getSearchParams } from "../../utils/utils";

// rxjs
import { forkJoin, from, lastValueFrom, of } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";

// utils
import * as rp from "~/server/utils";

import {
  CreateBlogSchema,
  DeleteBlogSchema,
  UpdateBlogSchema,
} from "~/schema/blog.schema";
import { getBlogCategoryById$ } from "../../services/blog/blog-category";
import { getBlogTagById$ } from "../../services/blog/blog-tags";

const perms = {
  READ_LIST: "blog:list",
  READ: "blog:get",
  CREATE: "blog:create",
  UPDATE: "blog:update",
  DELETE: "blog:delete",
};

export class AdminBlogController {
  @checkLogin()
  static async action({ request, params }: ActionFunctionArgs) {
    switch (request.method) {
      case "DELETE":
        return AdminBlogController.delete({
          request,
          params,
        } as ActionFunctionArgs);
      default:
    }
  }

  @checkLogin()
  @permission(perms.READ_LIST)
  static async loader({ request }: LoaderFunctionArgs) {
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
      catchError((err) => {
        console.log(err);
        return of(err);
      }),
    );

    const { dataSource, category, tag } = await lastValueFrom(result$);

    return dataSource === null
      ? rp.respFailJson({ dataSource, category, tag }, "fail")
      : rp.respSuccessJson({ dataSource, category, tag }, "success");
  }

  @permission(perms.CREATE)
  @validate(CreateBlogSchema)
  static async post({ request }: ActionFunctionArgs) {
    const result$ = forkJoin({
      data: request.json(),
      userId: getUserId$(request),
    }).pipe(switchMap((data) => createBlog$(data)));

    const blogCategory = await lastValueFrom(result$);

    return blogCategory === null
      ? rp.respFailJson({}, "创建失败")
      : rp.respSuccessJson(blogCategory, "创建成功");
  }

  @permission(perms.UPDATE)
  @validate(UpdateBlogSchema)
  static async put({ request }: ActionFunctionArgs) {
    const result$ = forkJoin({
      data: request.json(),
      userId: getUserId$(request),
    }).pipe(switchMap((data) => updateBlog$(data)));

    const blog = await lastValueFrom(result$);

    return blog === null
      ? rp.respFailJson({}, "更新失败")
      : rp.respSuccessJson(blog, "更新成功");
  }

  @permission(perms.DELETE)
  @validate(DeleteBlogSchema)
  static async delete({ request }: ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap(({ ids }) => deleteManyBlogByIds$(ids)),
    );

    const blog = await lastValueFrom(result$);

    return blog === null
      ? rp.respFailJson({}, "删除失败")
      : rp.respSuccessJson(blog, "删除成功");
  }
}
