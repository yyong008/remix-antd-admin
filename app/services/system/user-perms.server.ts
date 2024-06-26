// utils
import { from, map, of, switchMap } from "rxjs";

// types
import type { Observable } from "rxjs";
// server
import prisma from "~/libs/prisma";

export interface IUserPerms {
  getMenuTreeByUserId$(id: number): Observable<any>;
  getFlatMenuByUserId$(userId: number): Observable<any>;
  getAllFlatMenuByUserId$(userId: number): Observable<any>;
  getAllFlatMenuByUserId$(userId: number): Observable<any>;
}

/**
 * 更具 userId 级联表查询到用户菜单
 * @param id
 * @returns
 */
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

/**
 * 根据用户 id 获取菜单，并去重
 * @param userId 用户 Id
 * @returns 去重后的菜单
 */
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

/**
 * 根据用户 id 获取菜单，并去重
 * @param userId 用户 Id
 * @returns 去重后的菜单
 */
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

/**
 * 根据用户 id 获取用户所有的菜单中的权限
 * @param userId 用户 Id
 * @returns
 */
export const getUserPerms$ = (userId: number): Observable<any[]> => {
  return getAllFlatMenuByUserId$(userId).pipe(
    map((menus) => menus.filter((e) => e.permission).map((m) => m.permission)),
    // distinct()
  );
};
