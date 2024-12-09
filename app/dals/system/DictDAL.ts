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
}

export const dictDAL = new DictDAL();
