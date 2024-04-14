// types
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";

// services
import {
  createNewsCategory,
  getNewsCategoryListByUserId,
} from "~/server/services/news/news-category";
import { getUserId$ } from "~/server/services/common/session";

// decorator
import { checkLogin } from "../decorators/check-auth.decorator";

// rxjs
import { lastValueFrom } from "rxjs";

export class AdminNewsCategoryWithIdController {
  @checkLogin()
  static async loader({ request, params }: LoaderFunctionArgs) {
    const userId = await lastValueFrom(getUserId$(request));
    return json({
      dataSource: await getNewsCategoryListByUserId(userId!),
    });
  }

  @checkLogin()
  static async action({ request, params }: ActionFunctionArgs) {
    const method = request.method;

    if (method === "POST") {
      const data = await request.json();
      const userId = await lastValueFrom(getUserId$(request));
      // 校验数据

      // 写入数据
      const linkCategory = await createNewsCategory({
        ...data,
        userId,
      });

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
    } else if (method === "DELETE") {
      // 删除
      return json({
        code: 0,
        message: "暂不支持",
        data: {},
      });
    } else if (method === "PUT") {
      // 更新
      return json({
        code: 0,
        message: "暂不支持",
        data: {},
      });
    }
  }
}
