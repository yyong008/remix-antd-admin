// types
import type * as rrn from "@remix-run/node";

// rxjs
import { switchMap } from "rxjs";

// decorators
import * as ds from "~/server/decorators";
import { getUserId$ } from "~/server/services/common/session";

// services
import { createUserSignInLog$ } from "~/server/services/sign-in";

// utils
import * as utils from "~/server/utils";

export class ApiSignInController {
  @ds.Action
  static async action({ request, params }: rrn.LoaderFunctionArgs) {}

  @ds.checkLogin()
  static async post({ request, params }: rrn.LoaderFunctionArgs) {
    // TODO: 进入队列中
    const result$ = getUserId$(request).pipe(
      switchMap((userId) => {
        return createUserSignInLog$({
          userId: userId!,
          signType: 1,
          signTime: new Date(),
        });
      }),
    );

    return utils.resp$(result$);
  }
}
