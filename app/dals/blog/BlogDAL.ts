import prisma from "@/libs/prisma";

export class BlogDAL {
  /**
   * 创建
   * @param data
   * @returns
   */
  public async create(data: any): Promise<any> {
    return await prisma.blog.create({
      data,
    });
  }
  /**
   * 更新
   * @param data
   * @returns
   */
  public async update(data: any): Promise<any> {
    return await prisma.blog.update({
      where: {
        id: data.id,
      },
      data,
    });
  }
  /**
   * 根据 ids 删除
   * @param ids
   * @returns
   */
  public async deleteByIds(ids: number[]): Promise<any> {
    return await prisma.blog.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
  /**
   * 获取所有
   * @returns
   */
  public async getAll(): Promise<any> {
    return await prisma.blog.findMany();
  }

  /**
   * 根据 categoryId 获取列表
   * @param categoryId
   * @returns
   */
  public async getListByCategoryId(categoryId: number): Promise<any> {
    return await prisma.blog.findMany({
      where: {
        categoryId,
      },
    });
  }
  /**
   * 获取博客列表
   * @param userId
   * @param categoryId
   * @param tagId
   * @returns
   */
  public async getListByIds(
    userId: number,
    categoryId: number,
    tagId: number,
  ): Promise<any> {
    const where: any = {
      userId,
    };

    if (tagId) where.tagId = tagId;
    if (categoryId) where.categoryId = categoryId;

    return await prisma.blog.findMany({
      where,
    });
  }
  /**
   * 根据 id 获取博客
   * @param id
   * @returns
   */
  public async getById(id: number): Promise<any> {
    return await prisma.blog.findUnique({
      where: {
        id,
      },
    });
  }
}

export const blogDAL = new BlogDAL();
