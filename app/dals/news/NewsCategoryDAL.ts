import prisma from "@/libs/prisma";

export class NewsCategoryDAL {
  /**
   * 获取新闻分类数量
   * @returns
   */
  async getCount() {
    return await prisma.newsCategory.count();
  }

  /**
   * 根据 id 获取新闻分类
   * @param id
   * @returns
   */
  async getById(id: number) {
    return await prisma.newsCategory.findUnique({ where: { id } });
  }

  /**
   * 获取新闻分类列表
   * @param data
   * @returns
   */
  async getList(data: any) {
    return await prisma.newsCategory.findMany({
      skip: data.pageSize * (data.page - 1),
      take: data.pageSize,
    });
  }

  /**
   * 获取全部新闻分类
   * @returns
   */
  async getAll() {
    return await prisma.newsCategory.findMany();
  }

  /**
   * 获取分类列表带分页
   * @param param0
   * @returns
   */
  async getListWithMore({ where, skip, take }: any) {
    return await prisma.newsCategory.findMany({
      where,
      skip,
      take,
    });
  }
  async getNewsCategoryListByUserId(userId: number) {
    return await prisma.newsCategory.findMany({
      where: {
        userId,
      },
    });
  }
  async getNewsCategoryListByNewsId() {
    return await prisma.newsCategory.findMany({
      where: {
        // news: newsId,
      },
    });
  }
  async getNewsCategoryListByNewsIds() {
    return await prisma.newsCategory.findMany({
      where: {
        // news: newsIds,
      },
    });
  }

  /**
   * 创建新闻分类
   * @param data
   * @returns
   */
  async create(data: any) {
    return await prisma.newsCategory.create({
      data: {
        name: data.name,
        description: data.description,
        userId: data.userId,
      },
    });
  }

  /**
   * 更新新闻分类
   * @param data
   * @returns
   */
  async update(data: any) {
    return await prisma.newsCategory.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        description: data.description,
        userId: data.userId,
      },
    });
  }
  /**
   * 删除
   * @param ids
   * @returns
   */
  async deleteByIds(ids: number[]) {
    return await prisma.newsCategory.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}

export const newsCategoryDAL = new NewsCategoryDAL();
