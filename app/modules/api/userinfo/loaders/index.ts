import type * as rrn from "@remix-run/node";
import * as userPermsServices from "~/services/system/user-perms.server";
import * as userServices from "~/services/system/user";

import { forkJoin, from, lastValueFrom, switchMap } from "rxjs";

import { getTokenUserIdByArgs } from "~/lib/jose";

export async function query(args: rrn.LoaderFunctionArgs) {
  const getDashboardData = (userId: number) =>
    forkJoin({
      menu: userPermsServices.getFlatMenuByUserId$(userId!),
      userInfo: userServices.getUserInfoById$(userId!),
    });
  const result$ = from(getTokenUserIdByArgs(args)).pipe(
    switchMap((data) => getDashboardData(data.userId!)),
  );

  return await lastValueFrom(result$);
}
