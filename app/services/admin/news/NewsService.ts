import { joseJwt } from "@/libs/jose";

import { newsDAL } from "@/dals/news/NewsDAL";
import { urlSearchParams } from "@/utils/server/search";

class NewsService {
  async getById(args: any) {
    const id = Number(args.params.id);
    const result = await newsDAL.getNewsById(id);
    return result;
  }
  async getList(args: any) {
    const page = urlSearchParams.getPage(args.request);
    const pageSize = urlSearchParams.getPageSize(args.request);
    const payload = await joseJwt.getTokenUserIdByArgs(args);

    const data = {
      page,
      pageSize,
      userId: payload.userId,
    };
    const total = await newsDAL.getCount();
    const result = await newsDAL.getList(data);
    return {
      total,
      list: result,
    };
  }
  async create(args: any) {
    const dto = args.request.json();
    const payload = await joseJwt.getTokenUserIdByArgs(args);

    const data = {
      ...dto,
      userId: payload.userId,
    };

    const result = await newsDAL.create(data);
    return result;
  }

  /**
   * 根据 ids 删除新闻
   * @param args
   * @returns
   */
  async deleteByIds(args: any) {
    const ids = await args.request.json();
    const result = await newsDAL.deleteByIds(ids);
    return result;
  }

  /**
   * 更新新闻
   * @param args
   * @returns
   */
  async update(args: any) {
    const dto = args.request.json();
    const payload = await joseJwt.getTokenUserIdByArgs(args);

    const data = {
      ...dto,
      userId: payload.userId,
    };

    const result = await newsDAL.update(data);
    return result;
  }
}

export const newsService = new NewsService();
