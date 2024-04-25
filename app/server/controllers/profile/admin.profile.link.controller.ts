// types
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";

// components
import { createLink, getLinkListById } from "~/server/services/profile/link";
import { checkLogin } from "../../decorators/check-auth.decorator";

export class AdminProfileLinkController {
  @checkLogin()
  static async loader({ params }: LoaderFunctionArgs) {
    const { id } = params;
    return json({
      dataSource: await getLinkListById(Number(id)),
    });
  }

  @checkLogin()
  static async action({ request }: ActionFunctionArgs) {
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
  }
}
