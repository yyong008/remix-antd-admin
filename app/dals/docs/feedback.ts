import type { Prisma } from "@prisma/client";
import { from, type Observable } from "rxjs";

import { SortOrder, type TPage } from "@/types";

import prisma from "@/libs/prisma";

export const readFeedbackById$ = (id: number): Observable<any[]> => {
  return from(
    prisma.feedBack.findMany({
      where: {
        id,
      },
    }),
  );
};

export const readFeedbackByList$ = (data: TPage): Observable<any[]> => {
  const { page = 1, pageSize = 10 } = data;
  return from(
    prisma.feedBack.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        id: SortOrder.DESCENDING,
      },
    }),
  );
};

export const createFeedback$ = (
  data: Prisma.FeedBackCreateInput,
): Observable<any> => {
  return from(
    prisma.feedBack.create({
      data: {
        userId: data.userId,
        content: data.content,
        url: data.url,
      },
    }),
  );
};

export const updateFeedbackById$ = (
  data: Prisma.FeedBackUpdateInput & { id: number },
): Observable<any> => {
  return from(
    prisma.feedBack.update({
      where: {
        id: data.id,
      },
      data,
    }),
  );
};

export const deleteFeedbackByIds$ = (ids: number[]): Observable<any> => {
  return from(
    prisma.feedBack.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    }),
  );
};

export const getFeedBackCount$ = (): Observable<any> => {
  return from(prisma.feedBack.count());
};
