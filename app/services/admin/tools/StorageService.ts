import { joseJwt } from "@/libs/jose";
import { storageDAL } from "@/dals/tools/StorageDAL";
import { urlSearchParams } from "@/utils/server/search";

class StorageService {
  /**
   * 根据 id 获取存储信息
   * @param args
   * @returns
   */
  async getById(args: any) {
    const id = Number(args.params.id);
    const result = await storageDAL.getById(id);
    return result;
  }
  /**
   * 获取存储列表
   * @param args
   * @returns
   */
  async getList(args: any) {
    const payload = await joseJwt.getTokenUserIdByArgs(args);
    const page = urlSearchParams.getPage(args.request);
    const pageSize = urlSearchParams.getPageSize(args.request);

    const total = await storageDAL.getCount();
    const list = await storageDAL.getList({
      where: {
        userId: payload.userId,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return {
      total,
      list,
    };
  }

  /**
   * 创建根据 data
   * @param data
   * @returns
   */
  async createByData(data: any) {
    const result = await storageDAL.create(data);
    return result;
  }
  /**
   * 创建 storage
   * @param args
   * @returns
   */
  async create(args: any) {
    const dto = await args.request.json();
    const payload = await joseJwt.getTokenUserIdByArgs(args);

    const data = {
      ...dto,
      userId: payload.userId,
    };

    const result = await storageDAL.create(data);
    return result;
  }

  /**
   * 根据 ids 删除
   * @param args
   * @returns
   */
  async deleteById(args: any) {
    const dto = args.request.json();
    const result = await storageDAL.deleteByIds(dto.ids);
    return result;
  }
}

export const storageService = new StorageService();
