import { dictDAL } from "@/dals/system/DictDAL";
import { urlSearchParams } from "@/utils/server/search";

class DictService {
  /**
   * 获取列表
   * @param args
   * @returns
   */
  async getList(args: any) {
    const id = args.params.id;
    const page = urlSearchParams.getPage(args.request);
    const pageSize = urlSearchParams.getPageSize(args.request);

    const total = await dictDAL.getCount();
    const list = await dictDAL.getList({
      id,
      page,
      pageSize,
    });
    return {
      total,
      list,
    };
  }

  /**
   * 创建
   * @param args
   * @returns
   */
  async create(args: any) {
    const dto = await args.request.json();
    const result = await dictDAL.create(dto);
    return result;
  }

  /**
   * 更新
   * @param args
   * @returns
   */
  async update(args: any) {
    const dto = await args.request.json();
    const result = await dictDAL.update(dto);
    return result;
  }

  /**
   * 删除
   * @param args
   * @returns
   */
  async deleteByIds(args: any) {
    const { ids } = await args.request.json();
    const result = await dictDAL.deleteByIds(ids);
    return result;
  }
}

export const dictService = new DictService();
