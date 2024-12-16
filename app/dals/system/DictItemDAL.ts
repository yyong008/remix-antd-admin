import prisma from "@/libs/prisma";

export class DictItemDAL {
  /**
   * 获取字典项数量
   * @returns
   */
  async getCount(dictionary_id: number) {
    return await prisma.dictionaryEntry.count({
      where: {
        dictionary_id,
      },
    });
  }

  /**
   * 根据字典id获取字典项列表
   * @param dictionary_id
   * @returns
   */
  async getAll(dictionary_id: number) {
    return await prisma.dictionaryEntry.findMany({
      where: {
        dictionary_id,
      },
    });
  }

  /**
   * 根据id获取字典项
   * @param id
   * @returns
   */
  async getById(id: number) {
    return await prisma.dictionaryEntry.findUnique({
      where: {
        id,
      },
    });
  }

  /**
   * 获取字典项列表
   * @returns
   */
  async getList({
    dictionary_id,
    page = 1,
    pageSize = 10,
  }: {
    dictionary_id: number;
    page: number;
    pageSize: number;
  }) {
    return await prisma.dictionaryEntry.findMany({
      where: {
        dictionary_id,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }

  /**
   * 创建字典项
   * @param data
   * @returns
   */
  async create(data: any) {
    return await prisma.dictionaryEntry.create({
      data,
    });
  }

  /**
   * 更新字典项
   * @param param0
   * @returns
   */
  async update({ id, ...data }: any) {
    return await prisma.dictionaryEntry.update({
      where: {
        id,
      },
      data,
    });
  }

  /**
   * 根据 ids 删除
   * @param ids
   * @returns
   */
  async deleteByIds(ids: number[]) {
    return await prisma.dictionaryEntry.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}

export const dictItemDAL = new DictItemDAL();
