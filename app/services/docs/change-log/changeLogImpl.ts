import type { Prisma } from "@prisma/client";
import { from, type Observable } from "rxjs";

import { SortOrder, type TPage } from "~/types";

// prisma
import prisma from "~/lib/prisma";

/**
 * 分页查询反馈
 * @param data {TPage}
 * @returns
 */
const findChangeLogByPage$ = (data: TPage): Observable<any[]> => {
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

/**
 * 创建 feedback
 * @param data {Prisma.ChangeLogCreateInput}
 * @returns
 */
const createChangeLog$ = (
  data: Prisma.ChangeLogCreateInput,
): Observable<any> => {
  data.publish_time = new Date(data.publish_time);
  console.log(data);
  return from(
    prisma.changeLog.create({
      data,
    }),
  );
};

/**
 * 更新反馈
 * @param data {Prisma.ChangeLogUpdateInput & { id: number}}
 * @returns
 */
const updateChangeLogById$ = (
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

/**
 * 删除反馈
 * @param ids {Number[]}
 * @returns
 */
const deleteChangeLogByIds$ = (ids: number[]): Observable<any> => {
  console.log(ids);
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

/**
 * 获取反馈数量
 */
const getChangeLogCount$ = (): Observable<any> => {
  return from(prisma.feedBack.count());
};

export {
  findChangeLogByPage$,
  createChangeLog$,
  updateChangeLogById$,
  deleteChangeLogByIds$,
  getChangeLogCount$,
};
