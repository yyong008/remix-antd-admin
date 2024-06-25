import { from, lastValueFrom, switchMap } from "rxjs";

import { createUserSignInLog$ } from "~/services/sign-in";
import { getTokenUserIdByArgs } from "~/lib/jose";
import { type ActionFunctionArgs } from "@remix-run/node";

export async function signInAction(args: ActionFunctionArgs) {
  const result$ = from(getTokenUserIdByArgs(args)).pipe(
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
