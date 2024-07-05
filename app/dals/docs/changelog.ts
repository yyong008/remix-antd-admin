import type { Prisma } from "@prisma/client";
import { from, type Observable } from "rxjs";
import { SortOrder, type TPage } from "@/types";
import prisma from "@/libs/prisma";

export const getChangeLogById$ = (id: number): Observable<any[]> => {
  return from(
    prisma.changeLog.findMany({
      where: {
        id,
      },
    }),
  );
};

export const getChangeLogByList$ = (data: TPage): Observable<any[]> => {
  const { page = 1, pageSize = 10 } = data;
  return from(
    prisma.changeLog.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        id: SortOrder.DESCENDING,
      },
    }),
  );
};

export const createChangeLog$ = (
  data: Prisma.ChangeLogCreateInput,
): Observable<any> => {
  data.publish_time = new Date(data.publish_time);
  return from(
    prisma.changeLog.create({
      data,
    }),
  );
};

export const updateChangeLogById$ = (
  data: Prisma.ChangeLogUpdateInput & { id: number },
): Observable<any> => {
  return from(
    prisma.changeLog.update({
      where: {
        id: data.id,
      },
      data,
    }),
  );
};

export const deleteChangeLogByIds$ = (ids: number[]): Observable<any> => {
  return from(
    prisma.changeLog.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    }),
  );
};

export const getChangeLogCount$ = (): Observable<any> => {
  return from(prisma.changeLog.count());
};
