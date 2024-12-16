import { dictItemDAL } from "@/dals/system/DictItemDAL";
import { urlSearchParams } from "@/utils/server/search";

class DictItemService {
  /**
   * 获取字典条目列表
   * @param args
   */
  async getList(args: any) {
    if (!args.params.id) {
      throw new Error("字典ID不能为空");
    }
    const id = Number(args.params.id);
    const page = urlSearchParams.getPage(args.request) || 1;
    const pageSize = urlSearchParams.getPageSize(args.request) || 10;
    const total = await dictItemDAL.getCount(id);
    const list: any = await dictItemDAL.getList({
      page,
      pageSize,
      dictionary_id: Number(id),
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
    const result = await dictItemDAL.create({
      ...dto,
    });
    return result;
  }

  /**
   * 更新
   * @param args
   * @returns
   */
  async update(args: any) {
    const dto = await args.request.json();
    const result = await dictItemDAL.update(dto);
    return result;
  }

  /**
   * 根据 ids
   * @param args
   * @returns
   */
  async deleteByIds(args: any) {
    const dto = await args.request.json();
    const result = await dictItemDAL.deleteByIds(dto.ids);
    return result;
  }
}

export const dictItemService = new DictItemService();
