import { from, map, of, switchMap } from "rxjs";

import prisma from "@/libs/prisma";

export const getLinkCategoryCount$ = () => {
  return from(prisma.linkCategory.count());
};

export const getLinkCategoryCountByUserId$ = (userId: number) => {
  return from(
    prisma.linkCategory.count({
      where: {
        userId,
      },
    }),
  );
};

export const createLinkCategory$ = (data: any) => {
  return from(
    prisma.linkCategory.create({
      data,
    }),
  );
};

export const updateLinkCategoryById$ = ({ id, ...data }: any) => {
  return from(
    prisma.linkCategory.update({
      where: {
        id,
      },
      data,
    }),
  );
};

export const deleteLinkCategoryByIds$ = (ids: number[]) => {
  return from(
    prisma.linkCategory.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    }),
  );
};

export const getLinkCategoryById$ = (id: number) => {
  return from(prisma.linkCategory.findUnique({ where: { id } }));
};

export const getLinkCategoryListByUserId$ = (data: {
  pageSize: number;
  page: number;
  userId: number;
  id: number;
}) => {
  return of(data)
    .pipe(
      map((data) => ({
        skip: data.pageSize * (data.page - 1),
        take: data.pageSize,
        userId: data.userId,
      })),
    )
    .pipe(
      switchMap(({ skip, take, userId }) =>
        from(
          prisma.linkCategory.findMany({
            where: {
              userId,
            },
            skip,
            take,
            orderBy: {
              id: "desc",
            },
          }),
        ),
      ),
    );
};
