import type { Prisma } from "@prisma/client";
import { from, type Observable } from "rxjs";

import { SortOrder, type TPage } from "~/types";

// prisma
import prisma from "~/libs/prisma";

/**
 * 分页查询反馈
 * @param data {TPage}
 * @returns
 */
const findFeedbackByPage$ = (data: TPage): Observable<any[]> => {
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

/**
 * 创建 feedback
 * @param data {Prisma.FeedBackCreateInput}
 * @returns
 */
const createFeedback$ = (data: Prisma.FeedBackCreateInput): Observable<any> => {
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

/**
 * 更新反馈
 * @param data {Prisma.FeedBackUpdateInput & { id: number}}
 * @returns
 */
const updateFeedBackById$ = (
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

/**
 * 删除反馈
 * @param ids {Number[]}
 * @returns
 */
const deleteFeedBackByIds$ = (ids: number[]): Observable<any> => {
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

/**
 * 获取反馈数量
 */
const getFeedBackCount$ = (): Observable<any> => {
  return from(prisma.feedBack.count());
};

export {
  findFeedbackByPage$,
  createFeedback$,
  updateFeedBackById$,
  deleteFeedBackByIds$,
  getFeedBackCount$,
};
