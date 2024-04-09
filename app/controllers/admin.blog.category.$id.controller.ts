import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

// services
import {
  createBlogCategory$,
  getBlogListById$,
  // getBlogListById$,
} from "~/server/services/blog/blog-category";
import { auth$, getUserId$ } from "~/server/services/common/session";

// json
import { json } from "@remix-run/node";

// services
import { checkLogin } from "~/server/decorators/check-auth.decorator";
import { lastValueFrom } from "rxjs";
import { getSearchParams } from "~/server/utils/utils";

export class AdminBlogCategoryWithIdController {
  @checkLogin()
  static async loader({ request, params }: LoaderFunctionArgs) {
    const userId = await lastValueFrom(getUserId$(request))!;
    console.log(
      "Number(getSearchParams(request, 'category'))",
      Number(getSearchParams(request, "category")),
    );
    return json({
      dataSource: await lastValueFrom(
        getBlogListById$(
          userId!,
          Number(getSearchParams(request, "category")),
          Number(getSearchParams(request, "tag")),
        ),
      ),
    });
  }

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
}
