// types
import type { LoaderFunctionArgs } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";

// services
import { auth$ } from "~/server/services/common/session";
import { getStorageList, storageCount$ } from "~/server/services/tools/storage";

// utils
import { getPaginationByRequest } from "~/utils/pagination.util";

// decorator
import { checkLogin } from "../decorators/check-auth.decorator";

// rxjs
import { lastValueFrom } from "rxjs";

export class AdminToolsStorageController {
  @checkLogin()
  static async loader({ params, request }: LoaderFunctionArgs) {
    const [userId, redirectToLogin] = await lastValueFrom(
      auth$({
        request,
        params,
      } as LoaderFunctionArgs),
    );

    if (!userId) {
      return redirectToLogin();
    }
    const { page, pageSize, name } = getPaginationByRequest(request);

    return json({
      total: await lastValueFrom(storageCount$()),
      dataSource: await getStorageList({ page, pageSize, name }),
    });
  }
}
