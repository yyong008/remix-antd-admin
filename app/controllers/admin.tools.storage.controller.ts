// types
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";

// services
import {
  auth$,
  // destroySession,
  // getSession,
  // getUserId$,
} from "~/server/services/common/session";
import {
  getStorageList$,
  storageCount$,
} from "~/server/services/tools/storage";

import { checkLogin } from "~/server/decorators/check-auth.decorator";
import { lastValueFrom } from "rxjs";

import { getPaginationByRequest$ } from "~/utils/pagination.util";

export class AdminToolsStorage {
  @checkLogin()
  static async loader({ request, params }: LoaderFunctionArgs) {
    const [userId, redirectToLogin] = await lastValueFrom(
      auth$({
        request,
        params,
      } as LoaderFunctionArgs),
    );

    if (!userId) {
      return redirectToLogin();
    }
    const { page, pageSize, name } = await lastValueFrom(
      getPaginationByRequest$(request),
    );

    return json({
      total: await lastValueFrom(storageCount$()),
      dataSource: await lastValueFrom(
        getStorageList$({ page, pageSize, name }),
      ),
    });
  }

  @checkLogin()
  static async action({ request, params }: ActionFunctionArgs) {
    return null;
  }
}
