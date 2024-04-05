// types
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

// decorators
import { checkLogin } from "~/decorators/auth";
import { permission } from "~/decorators/perm";
import { validate } from "~/decorators/validate";

// schemas
import { CreateBlogCategorySchema } from "~/schema/blog.schema";

// services
import {
  createBlogCategory,
  getBlogCategory,
} from "~/services/blog/blog-category";
import { getUserId } from "~/services/common/auth.server";

// utils
import * as respUtils from "~/utils/response.json";

const perms: any = {
  GET: "blog:category-list:get",
  POST: "blog:category-list:create",
  PUT: "blog:category-list:update",
  DELETE: "blog:category-list:delete",
};

export class BlogCategoryListHandler {
  @checkLogin()
  static async action({ request, params }: ActionFunctionArgs) {
    const method = request.method;

    switch (method) {
      case "POST":
        BlogCategoryListHandler.post({ request, params } as ActionFunctionArgs);
        break;
      case "PUT":
        BlogCategoryListHandler.put({ request, params } as ActionFunctionArgs);
        break;
      case "DELETE":
        BlogCategoryListHandler.delete({
          request,
          params,
        } as ActionFunctionArgs);
        break;
      default:
        respUtils.respUnSupportJson();
        break;
    }
  }

  @permission(perms)
  @checkLogin()
  static async loader({ request, params }: LoaderFunctionArgs) {
    const userId = await getUserId(request);
    const dataSource = await getBlogCategory(userId!);
    return respUtils.respSuccessJson({
      dataSource,
    });
  }

  @permission(perms)
  @validate(CreateBlogCategorySchema)
  static async post({ request, params }: ActionFunctionArgs) {
    const data = await request.json();
    const linkCategory = await createBlogCategory({
      ...data,
      userId: await getUserId(request),
    });

    if (linkCategory === null) {
      return respUtils.respFailJson({}, "创建失败");
    }

    return respUtils.respSuccessJson(linkCategory, "创建成功");
  }

  @permission(perms)
  @validate(CreateBlogCategorySchema)
  static async put({ request, params }: ActionFunctionArgs) {
    const data = await request.json();
    const linkCategory = await createBlogCategory({
      ...data,
      userId: await getUserId(request),
    });

    if (linkCategory === null) {
      return respUtils.respFailJson({}, "创建失败");
    }

    return respUtils.respSuccessJson(linkCategory, "创建成功");
  }

  @permission(perms)
  @validate(CreateBlogCategorySchema)
  static async delete({ request, params }: ActionFunctionArgs) {
    const data = await request.json();
    const linkCategory = await createBlogCategory({
      ...data,
      userId: await getUserId(request),
    });

    if (linkCategory === null) {
      return respUtils.respFailJson({}, "创建失败");
    }

    return respUtils.respSuccessJson(linkCategory, "创建成功");
  }
}
