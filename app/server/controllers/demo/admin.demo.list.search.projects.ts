// types
// import type {
//   // LoaderFunctionArgs,
//   // LoaderFunction,
//   // MetaFunction,
// } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";

// libs
import { lastValueFrom } from "rxjs";

// services
import { getSearchApplicationCardList$ } from "~/__mock__/list/search.applications";

// decorator
import { checkLogin } from "../../decorators/check-auth.decorator";

export class AdminDemoListSearchProjectsController {
  @checkLogin()
  static async loader() {
    const data = await lastValueFrom(getSearchApplicationCardList$());
    return json(data);
  }
}
