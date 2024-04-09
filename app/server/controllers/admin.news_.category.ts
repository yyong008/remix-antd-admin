// types
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";

// services
import { createLink } from "~/server/services/profile/link";
import { getNewsListByCategoryId } from "~/server/services/news/news";

// decorator
import { checkLogin } from "../decorators/check-auth.decorator";

export class AdminNewsCategoryController {
  @checkLogin()
  static async loader({ params }: LoaderFunctionArgs) {
    const { id } = params;
    return json({
      dataSource: await getNewsListByCategoryId(Number(id)),
    });
  }

  @checkLogin()
  static async action({ request }: ActionFunctionArgs) {
    const method = request.method;

    if (method === "POST") {
      const data = await request.json();
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
}
