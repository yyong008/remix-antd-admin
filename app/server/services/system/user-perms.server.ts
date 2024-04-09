// types
import type { Observable } from "rxjs";

// utils
import { map, of, switchMap } from "rxjs";

// server
import prisma from "~/server/services/common/prisma";

/**
 * 根据用户 id 获取菜单，并去重
 * @param userId 用户 Id
 * @returns 去重后的菜单
 */
export function getFlatMenuByUserId$(userId: number): Observable<any[]> {
  return of(userId).pipe(
    switchMap((id) =>
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
    ),
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

/**
 * 根据用户 id 获取用户所有的菜单中的权限
 * @param userId 用户 Id
 * @returns
 */
export const getUserPerms$ = (userId: number): Observable<any[]> => {
  return getFlatMenuByUserId$(userId).pipe(
    map((menus) => menus.filter((e) => e.permission).map((m) => m.permission)),
  );
};
