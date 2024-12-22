import prisma from "@/libs/prisma";

export class BlogDAL {
  /**
   * 获取数量
   * @returns
   */
  public async getCount() {
    return await prisma.blog.count();
  }

  /**
   * 获取分页
   * @param param0
   * @returns
   */
  public async getPage({ page, pageSize }: any) {
    return await prisma.blog.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }
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
  public async getListByIds(data: any): Promise<any> {
    const { userId, categoryId, tagId, page, pageSize } = data;
    const where: any = {
      userId,
    };

    if (tagId) where.tagId = tagId;
    if (categoryId) where.categoryId = categoryId;

    return await prisma.blog.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
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
