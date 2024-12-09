import * as serverUtils from "~/utils/server";
import prisma from "@/libs/prisma";

export class SignInLogDAL {
  /**
   * 创建登录日志
   * @param data
   * @returns
   */
  async create(data: any) {
    return await prisma.userSignLog.create({ data });
  }

  /**
   * 获取用户登录日志
   * @param id
   * @returns
   */
  async getLatestById(id: number) {
    const { startTime, endTime } = serverUtils.getTodayTime();

    return await prisma.userSignLog.findFirst({
      where: {
        userId: id,
        signTime: {
          gte: startTime,
          lte: endTime,
        },
      },
    });
  }
}

export const signInLog = new SignInLogDAL();
