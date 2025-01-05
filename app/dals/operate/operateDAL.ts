import prisma from "@/libs/prisma";

export class OperateDAL {
  /**
   * 根据 用户 id 获取用户信息
   * @param id
   * @returns
   */
  async getById(id: number) {
    const op = await prisma.operate.findUnique({
      where: {
        id,
      },
    });
    return op;
  }

  /**
   * 根据分页获取操作记录
   * @param data
   * @returns
   */
  async getOperates(data: { where: any; skip: number; take: number }) {
    const ops = await prisma.operate.findMany({
      where: data.where,
      skip: data.skip,
      take: data.take,
    });
    return ops;
  }

  /**
   * 获取操作记录总数
   * @param data
   * @returns
   * */
  async getOperatesCount(data: { where: any }) {
    const count = await prisma.operate.count({
      where: data.where,
    });
    return count;
  }

  /**
   * 创建操作记录
   * @param data
   * @returns
   * */
  async createOperate(data: any) {
    const op = await prisma.operate.create({
      data,
    });
    return op;
  }

  /**
   * 根据 ids 删除操作记录
   * @param ids
   * @returns
   */
  async deleteByIdsOperate(ids: number[]) {
    const op = await prisma.operate.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    return op;
  }
}

export const operateDAL = new OperateDAL();
