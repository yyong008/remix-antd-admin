// types
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";

// utils
import { lastValueFrom } from "rxjs";

// services
import { createNewsCategory } from "~/server/services/news/news-category";
import { getNewsListByCategoryId$ } from "~/server/services/news/news";
import { getUserId$ } from "~/server/services/common/session";
import { checkLogin } from "~/server/decorators/check-auth.decorator";

export class AdminNewsCateogryWithIdController {
  @checkLogin()
  static async loader({ request, params }: LoaderFunctionArgs) {
    console.log(
      "x",
      params.id,
      await lastValueFrom(getNewsListByCategoryId$(Number(params.id)!)),
    );
    return json({
      dataSource: await lastValueFrom(
        getNewsListByCategoryId$(Number(params.id)!),
      ),
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
