import prisma from "@/libs/prisma";

export class BlogTagDAL {
  /**
   * 获取数量
   * @returns
   */
  async getCount() {
    return await prisma.blogTag.count();
  }
  /**
   * 获取所有
   * @returns
   */
  async getAll() {
    return await prisma.blogTag.findMany();
  }
  /**
   * 根据获取博客标签
   * @param userId
   * @returns
   */
  async getByUserId(userId: number) {
    return await prisma.blogTag.findMany({
      where: {
        userId,
      },
    });
  }
  /**
   * 根据 id 获取博客标签
   * @param id
   * @returns
   */
  async getBlogTagById(id: number) {
    return await prisma.blogTag.findUnique({ where: { id } });
  }
  /**
   * 根据 id 获取博客标签
   * @param userId
   * @returns
   */
  async getBlogCategoryTag(userId: number) {
    return await prisma.blogTag.findMany({
      where: {
        userId,
      },
    });
  }
  /**
   * 创建
   * @param data
   * @returns
   */
  async create(data: any) {
    return await prisma.blogTag.create({
      data: {
        name: data.name,
        description: data.description,
        userId: data.userId,
      },
    });
  }
  /**
   *
   * @param data
   * @returns
   */
  async update(data: any) {
    return await prisma.blogTag.update({
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
   * 根据 id 删除
   * @param id
   * @returns
   */
  async deleteById(id: number) {
    return await prisma.blogTag.delete({
      where: {
        id,
      },
    });
  }
  /**
   * 根据 ids 删除
   * @param ids
   * @returns
   */
  async deleteBlogTagByIds(ids: number[]) {
    return await prisma.blogTag.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}

export const blogTagDAL = new BlogTagDAL();
