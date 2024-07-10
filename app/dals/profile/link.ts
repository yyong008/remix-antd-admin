import { from, map, of, switchMap } from "rxjs";

import prisma from "@/libs/prisma";

export const readLinkCount$ = () => {
  return from(prisma.link.count());
};

export const createLink$ = (data: any) => {
  return of(data)
    .pipe(
      map((data) => ({
        userId: data.userId,
        name: data.name,
        description: data.description,
        categoryId: data.categoryId,
      })),
    )
    .pipe(
      switchMap(() =>
        from(
          prisma.link.create({
            data,
          }),
        ),
      ),
    );
};

export const updateLink$ = ({ id, ...data }: any) => {
  return from(
    prisma.link.update({
      where: {
        id,
      },
      data,
    }),
  );
};

export const deleteLinkByIds$ = (ids: number[]) => {
  return from(
    prisma.link.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    }),
  );
};

export const readLinkAll$ = () => {
  return from(prisma.link.findMany());
};

export const readLinkById$ = (id: number) => {
  return from(prisma.link.findUnique({ where: { id } }));
};

export const readLinkListByCategoryId$ = ({ categoryId, ...data }: any) => {
  return of(data)
    .pipe(
      map((data) => ({
        skip: data.pageSize * (data.page - 1),
        take: data.pageSize,
        categoryId,
      })),
    )
    .pipe(
      switchMap(({ skip, take, categoryId }) =>
        from(
          prisma.link.findMany({
            where: {
              categoryId,
            },
            skip,
            take,
          }),
        ),
      ),
    );
};
