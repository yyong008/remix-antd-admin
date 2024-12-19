import { joseJwt } from "@/libs/jose";
import { newsCategoryDAL } from "@/dals/news/NewsCategoryDAL";
import { urlSearchParams } from "~/utils/server/search";

class NewsCategoryService {
  /**
   * 根据 id 获取新闻分类
   * @param args
   * @returns
   */
  async getById(args: any) {
    const id = args.params.id;
    const result = await newsCategoryDAL.getById(id);
    return result;
  }

  /**
   * 获取新闻分类列表
   * @param args
   * @returns
   */
  async getList(args: any) {
    const page = urlSearchParams.getPage(args.request);
    const pageSize = urlSearchParams.getPageSize(args.request);

    const data = {
      page: +page,
      pageSize: +pageSize,
    };

    const total = await newsCategoryDAL.getCount();
    const list = await newsCategoryDAL.getList(data);

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
    const dto = args.request.json();
    const payload = await joseJwt.getTokenUserIdByArgs(args);

    const data = {
      ...dto,
      userId: payload.userId,
    };

    const result = await newsCategoryDAL.create(data);
    return result;
  }

  /**
   * 删除
   * @param args
   * @returns
   */
  async deleteByIds(args: any) {
    const { ids } = await args.request.json();
    const result = await newsCategoryDAL.deleteByIds(ids);
    return result;
  }

  /**
   * 更新
   * @param args
   * @returns
   */
  async update(args: any) {
    const dto = await args.request.json();
    const payload = await joseJwt.getTokenUserIdByArgs(args);
    const data = {
      ...dto,
      userId: payload.userId,
    };

    const result = await newsCategoryDAL.update(data);
    return result;
  }
}

export const newsCategoryService = new NewsCategoryService();
