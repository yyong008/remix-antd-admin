import { dictDAL } from "@/dals/system/DictDAL";
import { urlSearchParams } from "@/utils/server/search";

class DictService {
  async getList(args: any) {
    const id = args.params.id;
    const page = urlSearchParams.getPage(args.request);
    const pageSize = urlSearchParams.getPage(args.request);

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
}

export const dictService = new DictService();
