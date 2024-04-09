import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

// json
import { lastValueFrom } from "rxjs";
import { json } from "@remix-run/node";

// services
import {
  getBlogListById$,
  createBlogCategory$,
} from "~/server/services/blog/blog-category";
import { auth$, getUserId$ } from "~/server/services/common/session";

// decorator
import { checkLogin } from "~/server/decorators/check-auth.decorator";

export class AboutController {
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
      const linkCategory = await lastValueFrom(
        createBlogCategory$({
          ...data,
          userId: await lastValueFrom(getUserId$(request)),
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

  @checkLogin()
  static async loader({ request, params }: LoaderFunctionArgs) {
    const [userId, redirectToLogin] = await lastValueFrom(
      auth$({ request, params } as any),
    );

    if (!userId) {
      return redirectToLogin();
    }
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.searchParams);

    return json({
      dataSource: await lastValueFrom(
        getBlogListById$(
          userId!,
          Number(searchParams.get("category")),
          Number(searchParams.get("tag")),
        ),
      ),
    });
  }
}
