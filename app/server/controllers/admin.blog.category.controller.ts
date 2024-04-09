// types
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

// decorators
import { checkLogin } from "~/server/decorators/check-auth.decorator";
import { permission } from "~/server/decorators/check-perm";
import { validate } from "~/server/decorators/validate-schema";

// schemas
import { CreateBlogCategorySchema } from "~/schema/blog.schema";

// services
import {
  createBlogCategory$,
  // getBlogCategory$,
  getBlogCategoryByUserId$,
} from "~/server/services/blog/blog-category";
import { getUserId$ } from "~/server/services/common/session";

// utils
import * as respUtils from "~/server/utils/response.json";
import { lastValueFrom } from "rxjs";

const perms: any = {
  GET: "blog:category-list:get",
  POST: "blog:category-list:create",
  PUT: "blog:category-list:update",
  DELETE: "blog:category-list:delete",
};

export class AdminBlogCategoryController {
  @checkLogin()
  static async action({ request, params }: ActionFunctionArgs) {
    const method = request.method;

    switch (method) {
      case "POST":
        AdminBlogCategoryController.post({
          request,
          params,
        } as ActionFunctionArgs);
        break;
      case "PUT":
        AdminBlogCategoryController.put({
          request,
          params,
        } as ActionFunctionArgs);
        break;
      case "DELETE":
        AdminBlogCategoryController.delete({
          request,
          params,
        } as ActionFunctionArgs);
        break;
      default:
        respUtils.respUnSupportJson();
        break;
    }
  }

  // @permission(perms)
  // @checkLogin()
  static async loader({ request, params }: LoaderFunctionArgs) {
    const userId = await lastValueFrom(getUserId$(request));
    const dataSource = await lastValueFrom(getBlogCategoryByUserId$(userId!));
    console.log("datasource", dataSource);
    return respUtils.respSuccessJson({
      dataSource,
    });
  }

  @permission(perms)
  @validate(CreateBlogCategorySchema)
  static async post({ request, params }: ActionFunctionArgs) {
    const data = await request.json();
    const linkCategory = await lastValueFrom(
      createBlogCategory$({
        ...data,
        userId: await lastValueFrom(getUserId$(request)),
      }),
    );

    if (linkCategory === null) {
      return respUtils.respFailJson({}, "创建失败");
    }

    return respUtils.respSuccessJson(linkCategory, "创建成功");
  }

  @permission(perms)
  @validate(CreateBlogCategorySchema)
  static async put({ request, params }: ActionFunctionArgs) {
    const data = await request.json();
    const linkCategory = await lastValueFrom(
      createBlogCategory$({
        ...data,
        userId: await lastValueFrom(getUserId$(request)),
      }),
    );

    if (linkCategory === null) {
      return respUtils.respFailJson({}, "创建失败");
    }

    return respUtils.respSuccessJson(linkCategory, "创建成功");
  }

  @permission(perms)
  @validate(CreateBlogCategorySchema)
  static async delete({ request, params }: ActionFunctionArgs) {
    const data = await request.json();
    const linkCategory = await lastValueFrom(
      createBlogCategory$({
        ...data,
        userId: await lastValueFrom(getUserId$(request)),
      }),
    );

    if (linkCategory === null) {
      return respUtils.respFailJson({}, "创建失败");
    }

    return respUtils.respSuccessJson(linkCategory, "创建成功");
  }
}
