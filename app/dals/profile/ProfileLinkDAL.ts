import prisma from "@/libs/prisma";

export class ProfileLinkDAL {
  /**
   * 获取个人链接数量
   * @returns
   */
  async getCount({ userId }: { userId: number }) {
    return await prisma.link.count({
      where: {
        userId,
      },
    });
  }
  /**
   * 获取所有个人链接
   * @param param0
   * @returns
   */
  async getAll({ userId }: { userId: number }) {
    return await prisma.link.findMany({
      where: {
        userId,
      },
    });
  }
  /**
   * 获取个人链接列表
   * @param id
   * @returns
   */
  async getById(id: number) {
    return await prisma.link.findUnique({ where: { id } });
  }
  /**
   * 获取 categoryId 个人链接列表
   * @param categoryId
   * @returns
   */
  async getList({ where, skip, take }: any) {
    return await prisma.link.findMany({ where, skip, take });
  }

  /**
   * 创建个人链接
   * @param data
   * @returns
   */
  async create(data: any) {
    return await prisma.link.create({ data });
  }
  /**
   * 创建
   * @param param0
   * @returns
   */
  async update({ id, data }: { id: number; data: any }) {
    return await prisma.link.update({ where: { id }, data });
  }

  /**
   * 根据 ids 进行删除
   * @param ids
   * @returns
   */
  async deleteByIds(ids: number[]) {
    return await prisma.link.deleteMany({ where: { id: { in: ids } } });
  }
}

export const profileLinkDAL = new ProfileLinkDAL();
