import { newsDAL } from "@/dals/news/NewsDAL";
import { urlSearchParams } from "@/utils/server/search";

class NewsService {
  /**
   * 根据 id 获取
   * @param args
   * @returns
   */
  async getById(args: any) {
    const id = Number(args.params.id);
    const result = await newsDAL.getNewsById(id);
    return result;
  }
  /**
   * 获取列表
   * @param args
   * @returns
   */
  async getList(args: any) {
    const page = urlSearchParams.getPage(args.request);
    const pageSize = urlSearchParams.getPageSize(args.request);

    const data = {
      page,
      pageSize,
    };
    const total = await newsDAL.getCount();
    const list = await newsDAL.getPage(data);
    return {
      total,
      list,
    };
  }
}

export const newsService = new NewsService();
