//types
// import type {
//   LoaderFunctionArgs,
//   LoaderFunction,
//   MetaFunction,
// } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";

// lib
import { lastValueFrom } from "rxjs";

// service
import { getTableListDataSource$ } from "~/__mock__/profile/profile.server";

// decorator
import { checkLogin } from "../../decorators/check-auth.decorator";

export class AdminDemoProfileAdvancedController {
  @checkLogin()
  static async loader() {
    const data = await lastValueFrom(getTableListDataSource$());
    return json(data.tableListDataSource);
  }
}
