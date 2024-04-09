// rxjs
import { from } from "rxjs";

// server
import prisma from "~/server/services/common/prisma";

/**
 * 创建新闻分类
 * @param data
 * @returns
 */
export const createNewsCategory = async (data: any) => {
  try {
    return await prisma.newsCategory.create({
      data: {
        name: data.name,
        description: data.description,
        userId: data.userId,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

/**
 * 创建新闻分类
 * @param data
 * @returns
 */
export const createNewsCategory$ = (data: any) => {
  return from(
    prisma.newsCategory.create({
      data: {
        name: data.name,
        description: data.description,
        userId: data.userId,
      },
    }),
  );
};

/**
 * 查找所有新闻
 * @returns
 */
export const getFindNewsCategory = async () => {
  try {
    return await prisma.newsCategory.findMany();
  } catch (error) {
    console.log(error);
    return null;
  }
};

/**
 *  获取所有的新闻分类列表
 * @returns
 */
export const getFindNewsCategory$ = async () => {
  return from(prisma.newsCategory.findMany());
};

/**
 * 根据 userOd 获取新闻分类列表
 * @param userId
 * @returns
 */
export const getNewsCategoryListByUserId = async (userId: number) => {
  try {
    return await prisma.newsCategory.findMany({
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
 * 根据 userId 获取新闻分类列表
 * @param userId
 * @returns
 */
export const getNewsCategoryListByUserId$ = (userId: number) => {
  return from(
    prisma.newsCategory.findMany({
      where: {
        userId,
      },
    }),
  );
};
