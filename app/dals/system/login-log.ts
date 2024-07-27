import { from, map, of, switchMap } from "rxjs";

import type { Prisma } from "@prisma/client";
import { SortOrder } from "~/types";
import type { TPage } from "~/types";
import prisma from "~/libs/prisma";

export const createLoginLog = async (data: Prisma.LoginlogCreateInput) => {
  try {
    const res = await prisma.loginlog.create({
      data,
    });
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const loginLogCount = async () => {
  try {
    return await prisma.loginlog.count();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getLoginLogList = async (data: TPage) => {
  const { page = 1, pageSize = 10, name = "" } = data;
  try {
    return await prisma.loginlog.findMany({
      where: {
        name: {
          contains: name,
        },
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        id: SortOrder.DESCENDING,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getLoginLogLatestByUserId = async (userId: number) => {
  try {
    return await prisma.loginlog.findFirst({
      where: {
        userId,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const readLoginLogCount$ = () => from(prisma.loginlog.count());

export const readLoginLogList$ = (data: TPage) =>
  of(data)
    .pipe(
      map((data: TPage) => ({
        page: data.page || 1,
        pageSize: data.pageSize || 10,
        name: data.name || "",
      })),
    )
    .pipe(
      switchMap(({ name, page, pageSize }) =>
        prisma.loginlog.findMany({
          where: {
            name: {
              contains: name,
            },
          },
          skip: (page - 1) * pageSize,
          take: pageSize,
          orderBy: {
            id: SortOrder.DESCENDING,
          },
        }),
      ),
    );

export const readLoginLogLatestByUserId$ = (userId: number) =>
  from(
    prisma.loginlog.findFirst({
      where: {
        userId,
      },
    }),
  );
