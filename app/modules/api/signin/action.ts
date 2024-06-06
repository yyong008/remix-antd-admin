import * as ds from "~/server/decorators";
import type * as rrn from "@remix-run/node";
import * as utils from "~/server/utils";

import { createUserSignInLog$ } from "~/server/services/sign-in";
import { getUserId$ } from "~/server/services/common/session";
import { switchMap } from "rxjs";

interface SignInInterface {
  action(actionArgs: rrn.ActionFunctionArgs): any;
  POST(actionArgs: rrn.ActionFunctionArgs): any;
}

class Action implements SignInInterface {
  @ds.Action
  action(actionArgs: rrn.ActionFunctionArgs) {}

  @ds.checkLogin()
  async POST({ request, params }: rrn.LoaderFunctionArgs) {
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

export const action = new Action().action;
