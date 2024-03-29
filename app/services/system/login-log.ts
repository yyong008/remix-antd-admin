import type { Prisma } from "@prisma/client";
import type { TPage } from "~/types";

// enum
import { SortOrder } from "~/types";

// service
import prisma from "~/services/common/db.server";

/**
 * create login log info
 * @param data  Prisma.LoginLogCreateInput
 * @returns
 */
export const createLoginLog = async (data: Prisma.LoginLogCreateInput) => {
  try {
    const res = await prisma.loginLog.create({
      data,
    });
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

/**
 * 获取 Login Log 的数量
 * @returns Number
 */
export const loginLogCount = async () => {
  try {
    return await prisma.loginLog.count();
  } catch (error) {
    console.log(error);
    return null;
  }
};

/**
 * 获取分页获取登录信息的列表
 * @param param0 TPage
 * @returns
 */
export const getLoginLogList = async (data: TPage) => {
  const { page = 1, pageSize = 10, name = "" } = data;
  try {
    return await prisma.loginLog.findMany({
      where: {
        name: {
          contains: name,
        },
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        id: SortOrder.DESCENDING,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};
