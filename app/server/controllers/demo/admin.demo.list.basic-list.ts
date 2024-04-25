// type
// import type { LoaderFunctionArgs } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";

// libs
import { lastValueFrom } from "rxjs";

// services
import { getBasicList$ } from "~/__mock__/list/basic.list";

// decorator
import { checkLogin } from "../../decorators/check-auth.decorator";

export class AdminDemoLibSplitPaneControler {
  @checkLogin()
  static async loader() {
    const data = await lastValueFrom(getBasicList$());

    return json(data.dataSource);
  }
}
