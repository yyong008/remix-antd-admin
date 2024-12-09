import prisma from "@/libs/prisma";

export class ProfileLinkCategoryDAL {
  /**
   * 获取链接分类总数
   * @returns
   */
  async getCount() {
    return await prisma.linkCategory.count();
  }
  /**
   * 获取 userId 获取用户的链接分类总数
   * @param userId
   * @returns
   */
  async getCountByUserId(userId: number) {
    return await prisma.linkCategory.count({
      where: {
        userId,
      },
    });
  }

  /**
   * 根据 id 获取链接分类
   * @param id
   * @returns
   */
  async getById(id: number) {
    return await prisma.linkCategory.findUnique({ where: { id } });
  }

  /**
   * 根据 userId 获取链接分类列表
   * @param param0
   * @returns
   */
  async getListByUserId({ where, skip, take, orderBy }: any) {
    return await prisma.linkCategory.findMany({
      where,
      skip,
      take,
      orderBy,
    });
  }

  /**
   * 创建
   * @param data
   * @returns
   */
  async create(data: any) {
    return await prisma.linkCategory.create({
      data,
    });
  }

  /**
   * 更新
   * @param param0
   * @returns
   */
  async update({ id, ...data }: any) {
    return await prisma.linkCategory.update({
      where: {
        id,
      },
      data,
    });
  }

  /**
   * 根据 ids 进行删除
   * @param ids
   * @returns
   */
  async deleteByIds(ids: number[]) {
    return await prisma.linkCategory.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}

export const profileLinkCategoryDAL = new ProfileLinkCategoryDAL();
