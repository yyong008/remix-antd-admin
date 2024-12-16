import prisma from "@/libs/prisma";

export class DictDAL {
  /**
   * 获取字典数量
   * @returns
   */
  async getCount() {
    return await prisma.dictionary.count();
  }

  /**
   * 获取字典列表
   * @param data
   * @returns
   */
  async getList(data: any) {
    const { skip, take } = {
      skip: data.pageSize * (data.page - 1),
      take: data.pageSize,
    };
    return await prisma.dictionary.findMany({
      skip,
      take,
    });
  }

  /**
   * 创建字典
   * @param data
   * @returns
   */
  async create(data: any) {
    return await prisma.dictionary.create({ data });
  }

  /**
   * 更新字典
   * @param data
   * @returns
   */
  async update(data: any) {
    return await prisma.dictionary.update({ where: { id: data.id }, data });
  }

  /**
   * 删除
   * @param ids
   * @returns
   */
  async deleteByIds(ids: number[]) {
    return await prisma.dictionary.deleteMany({ where: { id: { in: ids } } });
  }
}

export const dictDAL = new DictDAL();
