import { from, lastValueFrom, map, switchMap } from "rxjs";

import { createUserSignInLog$ } from "~/dals/sign-in";
import { getTokenUserIdByArgs } from "~/libs/jose";
import { type ActionFunctionArgs } from "@remix-run/node";

export async function signInAction(args: ActionFunctionArgs) {
  const result$ = from(getTokenUserIdByArgs(args))
    .pipe(map((data) => data.userId))
    .pipe(
      switchMap((userId) => {
        return createUserSignInLog$({
          userId: userId!,
          signType: 1,
          signTime: new Date(),
        });
      }),
    );
  return await lastValueFrom(result$);
}
