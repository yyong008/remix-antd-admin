import type { Prisma } from "@prisma/client";

import { SortOrder, type TPage } from "@/types";
import prisma from "@/libs/prisma";

export class ChangeLogDAL {
  /**
   * 获取数量
   * @returns
   */
  async getCount() {
    return await prisma.changeLog.count();
  }
  /**
   * 根据 id 获取
   * @param id
   * @returns
   */
  async getById(id: number) {
    return await prisma.changeLog.findUnique({
      where: {
        id,
      },
    });
  }
  /**
   * 获取列表
   * @param data
   * @returns
   */
  async getList(data: TPage) {
    const { page = 1, pageSize = 10 } = data;
    return await prisma.changeLog.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        id: SortOrder.DESCENDING,
      },
    });
  }
  /**
   * 创建
   * @param data
   * @returns
   */
  async create(data: Prisma.ChangeLogCreateInput) {
    data.publish_time = new Date(data.publish_time);
    return await prisma.changeLog.create({ data });
  }
  /**
   * 更新
   * @param data
   * @returns
   */
  async update(data: Prisma.ChangeLogUpdateInput & { id: number }) {
    return await prisma.changeLog.update({
      where: {
        id: data.id,
      },
      data,
    });
  }
  /**
   * 根据 ids 列表
   * @param ids
   * @returns
   */
  async deleteByIds(ids: number[]) {
    return await prisma.changeLog.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}

export const changelogDAL = new ChangeLogDAL();
