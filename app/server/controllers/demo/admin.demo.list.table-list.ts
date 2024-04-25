// types
// import type { LoaderFunction, MetaFunction } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";

// libs
import { lastValueFrom } from "rxjs";

// service
import { getTableListDataSource$ } from "~/__mock__/profile/profile.server";

// decorators
import { checkLogin } from "../../decorators/check-auth.decorator";

export class AdminDemoListTableListController {
  @checkLogin()
  static async loader() {
    const { tableListDataSource } = await lastValueFrom(
      getTableListDataSource$(),
    );
    return json(tableListDataSource);
  }
}
