// types
// import type {
//   LoaderFunctionArgs,
//   LoaderFunction,
//   MetaFunction,
// } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";

// lib
import { lastValueFrom } from "rxjs";

// server
import { getLoggers$ } from "~/__mock__/profile/profile.server";

// decorators
import { checkLogin } from "../decorators/check-auth.decorator";

export class AdminDemoProfileAdvancedController {
  @checkLogin()
  static async loader() {
    const data = await lastValueFrom(getLoggers$());
    return json(data);
  }
}
