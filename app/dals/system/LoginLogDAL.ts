import type { Prisma } from "@prisma/client";
import { SortOrder } from "@/types";
import type { TPage } from "@/types";
import prisma from "@/libs/prisma";

export class LoginLogDAL {
  /**
   * 创建 loginLog
   * @param data
   * @returns
   */
  async create(data: Prisma.LoginlogCreateInput) {
    return await prisma.loginlog.create({
      data,
    });
  }

  /**
   * 获取 loginLog 数量
   * @returns
   */
  async getCount() {
    return await prisma.loginlog.count();
  }

  /**
   * 获取 loginLog 列表
   * @param data
   * @returns
   */
  async getLoginLogList(data: TPage) {
    return await prisma.loginlog.findMany({
      where: {
        name: {
          contains: data.name || "",
        },
      },
      skip: ((data.page || 1) - 1) * (data.pageSize || 10),
      take: data.pageSize,
      orderBy: {
        id: SortOrder.DESCENDING,
      },
    });
  }

  /**
   * 通过 userId 获取最新的 loginLog
   * @param userId
   * @returns
   */
  async getLoginLogLatestByUserId(userId: number) {
    return await prisma.loginlog.findFirst({
      where: {
        userId,
      },
    });
  }
}

export const loginLogDAL = new LoginLogDAL();
