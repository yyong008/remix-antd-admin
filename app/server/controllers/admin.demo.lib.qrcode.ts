// types
// import type { LoaderFunction, MetaFunction } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";

// libs
import { lastValueFrom } from "rxjs";

// db
import { getQrCodeList$ } from "~/__mock__/lib/qrcode";

// decorator
import { checkLogin } from "../decorators/check-auth.decorator";

export class AdminDemoLibQrCodeController {
  @checkLogin()
  static async loader() {
    const data = await lastValueFrom(getQrCodeList$());
    return json({ list: data });
  }
}
