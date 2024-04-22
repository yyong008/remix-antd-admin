// types
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

// decorators
import { permission } from "~/server/decorators/check-perm";
import { validate } from "~/server/decorators/validate-schema";
import { checkLogin } from "~/server/decorators/check-auth.decorator";

// schemas
import {
  CreateBlogCategorySchema,
  DeleteBlogCategorySchema,
  UpdateBlogCategorySchema,
} from "~/schema/blog.schema";

// services
import {
  createBlogCategory$,
  // getBlogCategory$,
  getBlogCategoryByUserId$,
  updateBlogCategory$,
} from "~/server/services/blog/blog-category";
import { getUserId$ } from "~/server/services/common/session";

// utils
import * as rp from "~/server/utils";

// rxjs
import { firstValueFrom, forkJoin, from, lastValueFrom, switchMap } from "rxjs";

const perms = {
  READ_LIST: "blog:category:list",
  READ: "blog:category:read",
  CREATE: "blog:category:create",
  UPDATE: "blog:category:update",
  DELETE: "blog:category:delete",
};

export class AdminBlogCategoryController {
  @checkLogin()
  static async action({ request, params }: ActionFunctionArgs) {
    switch (request.method) {
      case "POST":
        return AdminBlogCategoryController.post({
          request,
          params,
        } as ActionFunctionArgs);
      case "PUT":
        return AdminBlogCategoryController.put({
          request,
          params,
        } as ActionFunctionArgs);
      case "DELETE":
        return AdminBlogCategoryController.delete({
          request,
          params,
        } as ActionFunctionArgs);
      default:
        return rp.respUnSupportJson();
    }
  }

  @checkLogin()
  @permission(perms.READ_LIST)
  static async loader({ request, params }: LoaderFunctionArgs) {
    const result$ = getUserId$(request).pipe(
      switchMap((userId) => getBlogCategoryByUserId$(userId!)),
    );
    const dataSource = await lastValueFrom(result$);

    return dataSource
      ? rp.respSuccessJson({
          dataSource,
        })
      : rp.respFailJson({});
  }

  @permission(perms.CREATE)
  @validate(CreateBlogCategorySchema)
  static async post({ request }: ActionFunctionArgs) {
    const result$ = forkJoin({
      data: request.json(),
      userId: getUserId$(request),
    }).pipe(switchMap((data) => createBlogCategory$(data)));

    const blogCategory = await lastValueFrom(result$);

    return blogCategory === null
      ? rp.respFailJson({}, "创建失败")
      : rp.respSuccessJson(blogCategory, "创建成功");
  }

  @permission(perms.UPDATE)
  @validate(UpdateBlogCategorySchema)
  static async put({ request }: ActionFunctionArgs) {
    const result$ = forkJoin({
      data: from(request.json()),
      userId: getUserId$(request),
    }).pipe(
      switchMap((data) => {
        return updateBlogCategory$(data);
      }),
    );

    const blogCategory = await firstValueFrom(result$);

    return blogCategory === null
      ? rp.respFailJson({}, "更新失败")
      : rp.respSuccessJson(blogCategory, "更新成功");
  }

  @permission(perms.DELETE)
  @validate(DeleteBlogCategorySchema)
  static async delete({ request, params }: ActionFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((data) => deleteindBlogCategory$(data.id)),
    );

    const blogCategory = await lastValueFrom(result$);

    return blogCategory === null
      ? rp.respFailJson({}, "删除失败")
      : rp.respSuccessJson(blogCategory, "删除成功");
  }
}
