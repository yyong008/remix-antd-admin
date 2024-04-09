// types
import type { LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";
import { checkLogin } from "~/server/decorators/check-auth.decorator";

// service
import { getDictList } from "~/server/services/system/dict";

// remix:loader
export const loader: LoaderFunction = async () => {
  return json({
    dataSource: await getDictList(),
  });
};

export class AdminSystemDictController {
  @checkLogin()
  static async loader(_: LoaderFunctionArgs) {
    return json({
      dataSource: await getDictList(),
    });
  }
}
