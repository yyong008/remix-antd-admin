// types
// import type { LoaderFunction, MetaFunction } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";

// rxjs
import { lastValueFrom } from "rxjs";

// services
import { getPackageJsonData$ } from "~/__mock__/editor/json.service";

// decorators
import { checkLogin } from "../../decorators/check-auth.decorator";

export class AdminDemoEditorJsonViewer {
  @checkLogin()
  static async loader() {
    const { packageJson } = await lastValueFrom(getPackageJsonData$());
    return json({
      packageJson,
    });
  }
}
