// types
// import type {
//   LoaderFunctionArgs,
//   LoaderFunction,
//   MetaFunction,
// } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";

import { lastValueFrom } from "rxjs";

// service
import { getSearchProjectCardList$ } from "~/__mock__/list/search.projects";

// decorator
import { checkLogin } from "../../decorators/check-auth.decorator";

export class AdminDemoListSearchApplicationsController {
  @checkLogin()
  static async loader() {
    const _data = await lastValueFrom(getSearchProjectCardList$());
    return json({ data: _data });
  }
}
