import { dictItemDAL } from "@/dals/system/DictItemDAL";
import { urlSearchParams } from "@/utils/server/search";

const buildDeptListToTree = (items: any[], parentId?: number | null): any =>
  items
    .filter((item) => item.parent_department_id === parentId)
    .map((item) => ({
      ...item,
      children: buildDeptListToTree(items, item.id), // 递归构建子树
    }));

class DictItemService {
  /**
   * 获取字典条目列表
   * @param args
   */
  async getList(args: any) {
    const dictionary_id = urlSearchParams.getSearchParams(
      args.request,
      "dictionary_id",
    );
    const page = urlSearchParams.getPage(args.request) || 1;
    const pageSize = urlSearchParams.getPageSize(args.request) || 10;
    const total = await dictItemDAL.getCount(Number(dictionary_id));
    const list: any = await dictItemDAL.getList({
      page,
      pageSize,
      dictionary_id: Number(dictionary_id),
    });

    return {
      total,
      list: buildDeptListToTree(list, null),
    };
  }
}

export const dictItemService = new DictItemService();
