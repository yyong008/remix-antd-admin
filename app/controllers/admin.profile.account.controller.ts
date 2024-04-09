// types
import type { LoaderFunctionArgs } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";

// services
import { getUserId$ } from "~/server/services/common/session";
import { getUserInfoById } from "~/server/services/system/user";
import { createLinkCategory } from "~/server/services/profile/link-category";

// libs
import { lastValueFrom } from "rxjs";

// decorators
import { checkLogin } from "~/server/decorators/check-auth.decorator";

export class AdminProfileAccount {
  @checkLogin()
  static async loader({ request }: LoaderFunctionArgs) {
    const userId = await lastValueFrom(getUserId$(request));
    return json({
      dataSource: await getUserInfoById(userId!),
    });
  }

  @checkLogin()
  static async action({ request }: LoaderFunctionArgs) {
    const data = await request.json();
    const userId = await lastValueFrom(getUserId$(request));
    // 校验数据

    // 写入数据
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
