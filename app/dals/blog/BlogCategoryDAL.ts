import prisma from "@/libs/prisma";

export class BlogCategoryDAL {
  /**
   * 获取博客分类数量
   * @returns
   */
  async getCount() {
    return await prisma.blogCategory.count();
  }
  /**
   * 创建
   * @param data
   * @returns
   */
  async create(data: any) {
    return await prisma.blogCategory.create({ data });
  }

  /**
   * 更新
   * @param param0
   * @returns
   */
  async update({ id, ...data }: any) {
    return await prisma.blogCategory.update({
      where: {
        id: data.id,
      },
      data,
    });
  }

  /**
   * 根据 ids
   * @param ids
   * @returns
   */
  async deleteByIds(ids: number[]) {
    return await prisma.blogCategory.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  /**
   * 根据 userId 获取列表
   * @param userId
   * @returns
   */
  async getListByUserId(userId: number) {
    return await prisma.blogCategory.findMany({
      where: {
        userId,
      },
    });
  }

  /**
   * 获取博客
   * @param id
   * @returns
   */
  async getById(id: number) {
    return await prisma.blogCategory.findUnique({ where: { id } });
  }

  /**
   * 获取所有的博客分类
   * @returns
   */
  async getAll() {
    return await prisma.blogCategory.findMany();
  }

  /**
   * 根据各种 id 获取分类
   * @param userId
   * @param categoryId
   * @param tagId
   * @returns
   */
  async getListById(userId: number, categoryId?: number, tagId?: number) {
    const where: any = {
      userId,
    };
    if (categoryId) where.categoryId = categoryId;
    if (tagId) where.tagId = tagId;

    return await prisma.blog.findMany({
      where,
      select: {
        id: true,
        title: true,
        content: true,
        author: true,
        viewCount: true,
        publishedAt: true,
        categories: {
          select: {
            id: true,
            name: true,
          },
        },
        tags: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }
}

export const blogCategoryDAL = new BlogCategoryDAL();
