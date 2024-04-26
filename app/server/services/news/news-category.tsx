// types
import type { Observable } from "rxjs";

// rxjs
import { from } from "rxjs";

// server
import prisma from "~/server/services/common/prisma";

export interface INewsCategory {
  createNewsCategory(data: any): any;
  createNewsCategory$(data: any): Observable<any>;
  updateNewsCategory$(data: any): Observable<any>;
  deleteNewsCategoryByIds$(ids: number[]): Observable<any>;
  getFindNewsCategory(): any;
  getFindNewsCategory$(): Observable<any>;
  getNewsCategoryListByUserId(userId: number): any;
  getNewsCategoryListByUserId$(userId: number): Observable<any>;
}

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
 * 创建新闻分类
 * @param data
 * @returns
 */
export const updateNewsCategory$: INewsCategory["updateNewsCategory$"] = (
  data: any,
) => {
  return from(
    prisma.newsCategory.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        description: data.description,
        userId: data.userId,
      },
    }),
  );
};

/**
 * 创建新闻分类
 * @param data
 * @returns
 */
export const deleteNewsCategoryByIds$: INewsCategory["deleteNewsCategoryByIds$"] =
  (ids: number[]) => {
    return from(
      prisma.newsCategory.deleteMany({
        where: {
          id: {
            in: ids,
          },
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
export const getAllNewsCategory$ = () => {
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
