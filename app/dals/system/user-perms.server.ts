import { from, map, of, switchMap } from "rxjs";

import type { Observable } from "rxjs";
import prisma from "~/libs/prisma";

export interface IUserPerms {
  getMenuTreeByUserId$(id: number): Observable<any>;
  getFlatMenuByUserId$(userId: number): Observable<any>;
  getAllFlatMenuByUserId$(userId: number): Observable<any>;
  getAllFlatMenuByUserId$(userId: number): Observable<any>;
}

const getMenuTreeByUserId$ = (id: number) => {
  return from(
    prisma.user.findUnique({
      where: { id },
      include: {
        UserRole: {
          include: {
            roles: {
              include: {
                MenuRole: {
                  include: {
                    menus: true,
                  },
                },
              },
            },
          },
        },
      },
    }),
  );
};

export function getFlatMenuByUserId$(userId: number): Observable<any[]> {
  return of(userId).pipe(
    switchMap((id) => getMenuTreeByUserId$(id)),
    map((user) => {
      return user?.UserRole?.map(({ roles }) => roles)
        ?.map((role) => role.MenuRole)
        ?.reduce((p, c) => p.concat(c), [])
        ?.map((m) => m.menus)
        .filter((m) => m.type !== 3);
    }),
    map((menus) => {
      return [...new Set(menus)];
    }),
  );
}

export function getAllFlatMenuByUserId$(userId: number): Observable<any[]> {
  return of(userId).pipe(
    switchMap((id) => getMenuTreeByUserId$(id)),
    map((user) => {
      return user?.UserRole?.map(({ roles }) => roles)
        ?.map((role) => role.MenuRole)
        ?.reduce((p, c) => p.concat(c), [])
        ?.map((m) => m.menus);
    }),
    map((menus) => {
      return [...new Set(menus)];
    }),
  );
}

export const getUserPerms$ = (userId: number): Observable<any[]> => {
  return getAllFlatMenuByUserId$(userId).pipe(
    map((menus) => menus.filter((e) => e.permission).map((m) => m.permission)),
    // distinct()
  );
};
