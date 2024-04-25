// types
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";

// server
import { getUserId$ } from "~/server/services/common/session";
import { getUserInfoById } from "~/server/services/system/user";
import { createLinkCategory } from "~/server/services/profile/link-category";

// decorator
import { checkLogin } from "../../decorators/check-auth.decorator";

// rxjs
import { lastValueFrom } from "rxjs";

export class AdminProfileAccountController {
  @checkLogin()
  static async loader({ request }: LoaderFunctionArgs) {
    const userId = await lastValueFrom(getUserId$(request));
    return json({
      dataSource: await getUserInfoById(userId!),
    });
  }

  @checkLogin()
  static async action({ request }: ActionFunctionArgs) {
    const data = await request.json();
    const userId = await lastValueFrom(getUserId$(request));
    const linkCategory = await createLinkCategory({
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
  }
}
