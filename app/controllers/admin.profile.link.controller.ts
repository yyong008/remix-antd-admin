// types
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";

// decorator
import { checkLogin } from "~/server/decorators/check-auth.decorator";

// service
import { createLink, getLinkListById } from "~/server/services/profile/link";

export class AdminProfileLinkController {
  @checkLogin()
  static async loader({ request, params }: LoaderFunctionArgs) {
    return json({
      dataSource: await getLinkListById(Number(params.id ?? 0)),
    });
  }

  @checkLogin()
  static async action({ request }: ActionFunctionArgs) {
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
  }
}
