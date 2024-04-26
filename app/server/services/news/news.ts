import type { Observable } from "rxjs";

import dayjs from "dayjs";
import { from } from "rxjs";

// server
import prisma from "~/server/services/common/prisma";

export interface INews {
  createNews(data: any): any;
  updateNews(data: any): any;
  getNewsListByCategoryId(categoryId: number): any;
  getNewsById(id: number): any;
  getNews(): any;
}

export interface INews {
  createNews$(data: any): Observable<any>;
  updateNews$(data: any): Observable<any>;
  deleteNewsByIds$(data: any): Observable<any>;
  getNewsListByCategoryId$(categoryId: number): Observable<any>;
  getNewsById$(id: number): Observable<any>;
  getNews$(): Observable<any>;
}

/**
 * 创建新闻
 * @param data
 * @returns
 */
export const createNews = async (data: any) => {
  try {
    return await prisma.news.create({
      data: {
        title: data.title,
        content: data.content,
        author: data.author,
        source: data.source,
        publishedAt: dayjs(data.publishedAt).toISOString(),
        newsId: data.categoryId, // mod
        userId: data.userId,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

/**
 * 创建新闻
 * @param data
 * @returns
 */
export const createNews$ = (data: any): Observable<any> => {
  return from(
    prisma.news.create({
      data: {
        title: data.title,
        content: data.content,
        author: data.author,
        source: data.source,
        publishedAt: dayjs(data.publishedAt).toISOString(),
        newsId: data.categoryId, // mod
        userId: data.userId,
      },
    }),
  );
};

/**
 * 更新新闻
 * @param data
 * @returns
 */
export const updateNews = async (data: any) => {
  try {
    return await prisma.news.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        content: data.content,
        author: data.author,
        source: data.source,
        publishedAt: dayjs(data.publishedAt).toISOString(),
        newsId: data.categoryId, // mod
        userId: data.userId,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

/**
 * 更新新闻
 * @param data
 * @returns
 */
export const updateNews$ = (data: any): Observable<any> => {
  return from(
    prisma.news.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        content: data.content,
        author: data.author,
        source: data.source,
        publishedAt: dayjs(data.publishedAt).toISOString(),
        newsId: data.categoryId, // mod
        userId: data.userId,
      },
    }),
  );
};

/**
 * 更新新闻
 * @param data
 * @returns
 */
export const deleteNewsByIds$ = (ids: number[]): Observable<any> => {
  return from(
    prisma.news.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    }),
  );
};

/**
 * 根据分类 id 获取新闻列表
 * @param categoryId
 * @returns
 */
export const getNewsListByCategoryId = async (categoryId: number) => {
  try {
    return await prisma.news.findMany({
      where: {
        newsId: categoryId,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

/**
 * 根据分类 id 获取新闻列表
 * @param categoryId
 * @returns
 */
export const getNewsListByCategoryId$ = (
  categoryId: number,
): Observable<any[]> => {
  return from(
    prisma.news.findMany({
      where: {
        newsId: categoryId, // TODO: newsId is categoryId
      },
    }),
  );
};

/**
 * 根据用户 id 获取新闻
 * @param id
 * @returns
 */
export const getNewsById = async (id: number) => {
  try {
    return await prisma.news.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

/**
 * 更具用户id查找新闻：
 * @param id
 * @returns
 */
export const getNewsById$ = (id: number): Observable<any> => {
  // TODO: 更具用户 id findUnique
  return from(
    prisma.news.findUnique({
      where: {
        id,
      },
    }),
  );
};

/**
 * 获取所有新闻
 * @returns
 */
export const getNews = async () => {
  try {
    return await prisma.news.findMany();
  } catch (error) {
    console.log(error);
    return null;
  }
};

/**
 * 获取所有新闻
 * @returns
 */
export const getNews$ = (): Observable<any[]> => {
  return from(prisma.news.findMany());
};
