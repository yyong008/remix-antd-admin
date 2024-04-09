// types
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";

// server
import {
  createLinkCategory,
  getLinkCategoryListByUserId$,
} from "~/server/services/profile/link-category";
import { getUserId$ } from "~/server/services/common/session";

// decorator
import { checkLogin } from "../decorators/check-auth.decorator";

// rxjs
import { lastValueFrom } from "rxjs";

export class AdminProfileLinkCategoryController {
  @checkLogin()
  static async loader({ request }: LoaderFunctionArgs) {
    const userId = await lastValueFrom(getUserId$(request));
    return json({
      dataSource: await lastValueFrom(getLinkCategoryListByUserId$(userId!)),
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
