import type { Prisma } from "@prisma/client";
import { SortOrder, type TPage } from "@/types";

import prisma from "@/libs/prisma";

export class FeedbackDAL {
  /**
   * 获取数量
   * @returns
   */
  async getCount(): Promise<number> {
    return await prisma.feedBack.count();
  }
  /**
   * 根据 id 获取
   * @param id
   * @returns
   */
  async getById(id: number): Promise<any[]> {
    return await prisma.feedBack.findMany({
      where: {
        id,
      },
    });
  }

  /**
   * 根据列表
   * @param data
   * @returns
   */
  async getList(data: TPage): Promise<any[]> {
    const { page = 1, pageSize = 10, userId } = data;
    return await prisma.feedBack.findMany({
      where: {
        userId,
      },
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
  async create(data: Prisma.FeedBackCreateInput): Promise<any> {
    return await prisma.feedBack.create({
      data: {
        userId: data.userId,
        content: data.content,
        url: data.url,
      },
    });
  }

  /**
   * 更新
   * @param data
   * @returns
   */
  async update(id: number, data: Prisma.FeedBackUpdateInput) {
    return await prisma.feedBack.update({
      where: {
        id,
      },
      data,
    });
  }

  /**
   * 删除
   * @param ids
   * @returns
   */
  async deleteByIds(ids: number[]) {
    return await prisma.feedBack.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}

export const feedBackDAL = new FeedbackDAL();
