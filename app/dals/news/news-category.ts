import { from, map, of, switchMap } from "rxjs";

import prisma from "@/libs/prisma";

export const getNewsCategoryCount$ = () => {
  return from(prisma.newsCategory.count());
};

export const getNewsCategoryById$ = (id: number) => {
  return from(prisma.newsCategory.findUnique({ where: { id } }));
};

export const getNewsCategoryByPage$ = (data: any) => {
  return of(data)
    .pipe(
      map((data) => ({
        skip: data.pageSize * (data.page - 1),
        take: data.pageSize,
      })),
    )
    .pipe(
      switchMap(({ skip, take }) =>
        from(
          prisma.newsCategory.findMany({
            skip,
            take,
          }),
        ),
      ),
    );
};

export const createNewsCategory$ = (data: any) => {
  return from(
    prisma.newsCategory.create({
      data: {
        name: data.name,
        description: data.description,
        userId: data.userId,
      },
    }),
  );
};

export const updateNewsCategory$ = (data: any) => {
  return from(
    prisma.newsCategory.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        description: data.description,
        userId: data.userId,
      },
    }),
  );
};

export const deleteNewsCategoryByIds$ = (ids: number[]) => {
  return from(
    prisma.newsCategory.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    }),
  );
};

export const getAllNewsCategory$ = () => {
  return from(prisma.newsCategory.findMany());
};

export const getNewsCategoryListByUserId$ = (userId: number) => {
  return from(
    prisma.newsCategory.findMany({
      where: {
        userId,
      },
    }),
  );
};
