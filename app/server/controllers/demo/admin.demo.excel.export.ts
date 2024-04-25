// types
// import type { MetaFunction } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";

// libs
import { lastValueFrom } from "rxjs";

// db
import { getExcelDisease$ } from "~/__mock__/db/excel/export";

// decorator
import { checkLogin } from "../../decorators/check-auth.decorator";

export class AdminDemoExcelExport {
  @checkLogin()
  static async loader() {
    const { dataSource } = await lastValueFrom(getExcelDisease$());
    return json({ dataSource });
  }
}
