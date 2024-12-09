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
    try {
      return await prisma.dictionaryEntry.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log(error);
      return null;
    }
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
    try {
      return await prisma.dictionaryEntry.findMany({
        where: {
          dictionary_id,
        },
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export const dictItemDAL = new DictItemDAL();
