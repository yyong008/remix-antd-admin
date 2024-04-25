// type
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

// services
import { getUserId$ } from "~/server/services/common/session";
import { getBlogById$, updateBlog$ } from "~/server/services/blog/blog";
import { getAllBlogCategory$ } from "~/server/services/blog/blog-category";
import { getAllBlogTag$ } from "~/server/services/blog/blog-tags";

// utils
import { forkJoin, lastValueFrom, of, switchMap } from "rxjs";

// decorator
import { checkLogin } from "../../decorators/check-auth.decorator";

import { UpdateBlogSchema } from "~/schema/blog.schema";
import { permission } from "../../decorators/check-perm";
import { validate } from "../../decorators/validate-schema";

// utils
import * as rp from "~/server/utils";

const perms = {
  READ_LIST: "blog:list",
  READ: "blog:read",
  CREATE: "blog:create",
  UPDATE: "blog:update",
  DELETE: "blog:delete",
};

export class AdminBlogEditWithIdController {
  @checkLogin()
  static async loader({ request, params }: LoaderFunctionArgs) {
    const { id } = params;

    const result$ = forkJoin({
      TINYMCE_KEY: of(process.env.TINYMCE_KEY),
      blogData: getBlogById$(Number(id)),
      categoies: getUserId$(request).pipe(
        switchMap((userId) => getAllBlogCategory$()),
      ),
      tags: getAllBlogTag$(),
    });

    const res = await lastValueFrom(result$);

    return res ? rp.respSuccessJson(res) : rp.respFailJson(res);
  }

  @checkLogin()
  static async action({ request }: ActionFunctionArgs) {
    switch (request.method) {
      case "PUT":
        return AdminBlogEditWithIdController.put({
          request,
        } as ActionFunctionArgs);
      default:
        return rp.respUnSupportJson();
    }
  }

  @permission(perms.UPDATE)
  @validate(UpdateBlogSchema)
  static async put({ request }: ActionFunctionArgs) {
    const result$ = forkJoin({
      data: request.json(),
      userId: getUserId$(request),
    }).pipe(switchMap(({ data, userId }) => updateBlog$({ ...data, userId })));

    const blog = await lastValueFrom(result$);

    return blog === null
      ? rp.respFailJson({}, "更新失败")
      : rp.respSuccessJson(blog, "更新成功");
  }
}
