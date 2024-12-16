import dayjs from "dayjs";
import prisma from "@/libs/prisma";

export class NewsDAL {
  /**
   * 获取新闻总量
   * @returns
   */
  async getCount() {
    return await prisma.news.count();
  }

  /**
   * 获取列表
   * @param data
   * @returns
   */
  async getPage(data: any) {
    return await prisma.news.findMany({
      skip: data.pageSize * (data.page - 1),
      take: data.pageSize,
    });
  }

  /**
   * 获取列表
   * @param data
   * @returns
   */
  async getList(data: any) {
    return await prisma.news.findMany({
      where: {
        newsId: data.category,
      },
      skip: data.pageSize * (data.page - 1),
      take: data.pageSize,
    });
  }

  /**
   * 根据 categoryId 获取新闻列表
   * @param categoryId
   * @returns
   */
  async getNewsListByCategoryId(categoryId: number) {
    return await prisma.news.findMany({
      where: {
        newsId: categoryId, // TODO: newsId is categoryId
      },
    });
  }

  /**
   * 根据 id 获取新闻列表
   * @param id
   * @returns
   */
  async getNewsById(id: number) {
    return await prisma.news.findUnique({
      where: {
        id,
      },
    });
  }

  /**
   * 获取所有的新闻列表
   * @returns
   */
  async getAll() {
    return await prisma.news.findMany();
  }

  /**
   * 获取当前用户新闻列表
   * @param userId
   * @returns
   */
  async getListByUserId(userId: number) {
    return await prisma.news.findMany({
      where: {
        userId,
      },
    });
  }

  /**
   * 创建新闻
   * @param data
   * @returns
   */
  async create(data: any) {
    return await prisma.news.create({
      data: {
        title: data.title,
        content: data.content,
        author: data.author,
        source: data.source,
        publishedAt: dayjs(data.publishedAt).toISOString(),
        userId: data.userId,
        news: {
          connect: {
            id: data.newsId,
          },
        },
      },
    });
  }

  /**
   * 更新新闻
   * @param data
   * @returns
   */
  async update(data: any) {
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
        newsId: data.categoryId,
        userId: data.userId,
      },
    });
  }

  /**
   * 根据 ids 删除新闻
   * @param ids
   * @returns
   */
  async deleteByIds(ids: number[]) {
    return await prisma.news.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}

export const newsDAL = new NewsDAL();
