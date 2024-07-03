import {
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
} from "@remix-run/node";

import { getUserId$ } from "@/libs/session";
import { switchMap, lastValueFrom } from "rxjs";
import { getUserPerms$ } from "@/dals/system/user-perms.server";

type TT = ActionFunctionArgs | LoaderFunctionArgs;

export async function handlerPerm(args: TT, perm: string) {
  const { request } = args as ActionFunctionArgs;

  const result$ = getUserId$(request).pipe(
    switchMap((userId) => getUserPerms$(userId!)),
  );

  const usersPerms = await lastValueFrom(result$);
  if (!usersPerms.includes(perm)) {
    throw new Error("No Permission");
  }
}
