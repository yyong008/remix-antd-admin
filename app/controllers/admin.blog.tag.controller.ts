// types
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";

// services
import {
  createBlogTag$,
  getBlogTagByUserId$,
} from "~/server/services/blog/blog-tags";
import { auth$, getUserId$ } from "~/server/services/common/session";

// services
import { checkLogin } from "~/server/decorators/check-auth.decorator";

// lib
import { lastValueFrom } from "rxjs";

export class AdminBlogTagController {
  @checkLogin()
  static async loader({ request, params }: LoaderFunctionArgs) {
    const [userId, redirectToLogin] = await lastValueFrom(
      auth$({ request, params } as any),
    );

    if (!userId) {
      return redirectToLogin();
    }
    return json({
      dataSource: await lastValueFrom(getBlogTagByUserId$(userId!)),
    });
  }

  @checkLogin()
  static async action({ request, params }: ActionFunctionArgs) {
    const [userId, redirectToLogin] = await lastValueFrom(
      auth$({ request, params } as any),
    );

    if (!userId) {
      return redirectToLogin();
    }
    const method = request.method;

    if (method === "POST") {
      const data = await request.json();
      // 校验数据

      // 写入数据
      const userId = await lastValueFrom(getUserId$(request));
      const linkCategory = await lastValueFrom(
        createBlogTag$({
          ...data,
          userId,
        }),
      );

      if (linkCategory === null) {
        return json({
          code: 0,
          message: "创建失败",
          data: {},
        });
      }

      return json({
        code: 0,
        message: "创建成功",
        data: linkCategory,
      });
    } else if (method === "PUT") {
      return json({
        code: 0,
        message: "暂不支持",
        data: {},
      });
    } else if (method === "DELETE") {
      return json({
        code: 0,
        message: "暂不支持",
        data: {},
      });
    }
  }
}
