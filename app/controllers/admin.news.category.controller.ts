// types
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";

// services
import { createLink } from "~/server/services/profile/link";
import { getUserId$ } from "~/server/services/common/session";
import { getNewsCategoryListByUserId$ } from "~/server/services/news/news-category";

// decorator
import { checkLogin } from "~/server/decorators/check-auth.decorator";

// rxjs
import { lastValueFrom } from "rxjs";

export class AdminNewsCategoryController {
  @checkLogin()
  static async action({ request }: ActionFunctionArgs) {
    const method = request.method;

    if (method === "POST") {
      const data = await request.json();
      // 校验数据

      // 写入数据
      const linkCategory = await createLink(data);

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
  static async loader({ request }: LoaderFunctionArgs) {
    const userId = await lastValueFrom(getUserId$(request));
    return json({
      dataSource: await lastValueFrom(
        getNewsCategoryListByUserId$(Number(userId)),
      ),
    });
  }
}
