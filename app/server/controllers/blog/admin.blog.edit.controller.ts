// type
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

// services
import { getUserId$ } from "~/server/services/common/session";
import { getBlogTagByUserId$ } from "~/server/services/blog/blog-tags";
import { createBlog$ } from "~/server/services/blog/blog";
import { getAllBlogCategory$ } from "~/server/services/blog/blog-category";

// decorator
import { permission } from "../../decorators/check-perm";
import { checkLogin } from "../../decorators/check-auth.decorator";

// rxjs
import { forkJoin, from, lastValueFrom, of, switchMap } from "rxjs";

// utils
import * as rp from "../../utils/response.json";

const perms = {
  READ_LIST: "blog:list",
  READ: "blog:read",
  CREATE: "blog:create",
  UPDATE: "blog:update",
  DELETE: "blog:delete",
};

/**
 * 编辑并创建博客
 */
export class AdminBlogEditController {
  @checkLogin()
  @permission(perms.CREATE)
  static async loader({ request, params }: LoaderFunctionArgs) {
    const result$ = from(getUserId$(request)).pipe(
      switchMap((userId) =>
        forkJoin({
          TINYMCE_KEY: of(process.env.TINYMCE_KEY!),
          blogCategory: getAllBlogCategory$(),
          blogTag: getBlogTagByUserId$(userId!),
        }),
      ),
    );

    const res = await lastValueFrom(result$);
    return res ? rp.respSuccessJson(res) : rp.respFailJson({});
  }

  @checkLogin()
  static async action({ request }: ActionFunctionArgs) {
    switch (request.method) {
      case "POST":
        return AdminBlogEditController.post({
          request,
        } as ActionFunctionArgs);
      default:
        return rp.respUnSupportJson();
    }
  }

  @permission(perms.CREATE)
  static post({ request }: ActionFunctionArgs) {
    const result$ = forkJoin({
      data: request.json(),
      userId: getUserId$(request),
    }).pipe(
      switchMap(({ data, userId }) =>
        createBlog$({
          ...data,
          userId,
        }),
      ),
    );

    const res = lastValueFrom(result$);
    return res ? rp.respSuccessJson(res) : rp.respFailJson({});
  }
}
