import { from, map, of, switchMap } from "rxjs";

import prisma from "@/libs/prisma";

export const readDeptCount$ = () => {
  return from(prisma.department.count());
};

export const readDeptById$ = (id: number) => {
  return from(prisma.department.findUnique({ where: { id } }));
};

export const readAllDeptList$ = () => {
  return from(prisma.department.findMany());
};

export const readDeptList$ = (data: any) => {
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
          prisma.department.findMany({
            skip,
            take,
          }),
        ),
      ),
    );
};

export const createDept$ = (data: any) => {
  return from(
    prisma.department.create({
      data,
    }),
  );
};

export const updateDeptById$ = ({ id, ...data }: any) => {
  return from(
    prisma.department.update({
      where: { id },
      data,
    }),
  );
};

export const deleteDeptByIds$ = ({ ids }: any) => {
  return from(
    prisma.department.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    }),
  );
};
