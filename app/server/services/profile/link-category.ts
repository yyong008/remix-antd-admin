// import type { Prisma } from "@prisma/client";

// rxjs
import { from } from "rxjs";

// server
import prisma from "~/server/services/common/prisma";

/**
 * 创建链接分类
 * @param data
 * @returns
 */
export const createLinkCategory = async (data: any) => {
  try {
    return await prisma.linkCategory.create({
      data,
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

/**
 * 创建链接分类
 * @param data
 * @returns
 */
export const createLinkCategory$ = (data: any) => {
  return from(
    prisma.linkCategory.create({
      data,
    }),
  );
};

/**
 * 获取连接分类列表通过 userId
 * @param userId
 * @returns
 */
export const getLinkCategoryListByUserId = async (userId: number) => {
  try {
    return await prisma.linkCategory.findMany({
      where: {
        userId,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

/**
 * 获取连接分类列表通过 userId
 * @param userId
 * @returns
 */
export const getLinkCategoryListByUserId$ = (userId: number) => {
  return from(
    prisma.linkCategory.findMany({
      where: {
        userId,
      },
    }),
  );
};
