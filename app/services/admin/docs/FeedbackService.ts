import { joseJwt } from "@/libs/jose";
import { type ActionFunctionArgs } from "@remix-run/node";

import { feedBackDAL } from "@/dals/docs/FeedbackDAL";
import { urlSearchParams } from "@/utils/server/search";

class FeedbackService {
  /**
   * 根据列表 获取
   * @param args
   * @returns
   */
  async getById(args: any) {
    const id = args.params.id;
    const result = await feedBackDAL.getById(id);
    return result;
  }
  /**
   * 获取 feedback 列表
   * @param args
   * @returns
   */
  async getList(args: any) {
    const page = urlSearchParams.getPage(args.request);
    const pageSize = urlSearchParams.getPageSize(args.request);
    const payload = await joseJwt.getTokenUserIdByArgs(args);

    const data = {
      page,
      pageSize,
      userId: payload.userId,
    };

    const total = await feedBackDAL.getCount();
    const list = await feedBackDAL.getList(data);
    return {
      list,
      total,
    };
  }

  /**
   * 创建
   * @param args
   * @returns
   */
  async create(args: any) {
    const dto = await args.request.json();
    const pyload = await joseJwt.getTokenUserIdByArgs(args);

    const data = {
      ...dto,
      userId: pyload.userId,
    };
    const result = await feedBackDAL.create(data);
    return result;
  }

  /**
   * 删除
   * @param args
   * @returns
   */
  async deleteByIds(args: ActionFunctionArgs) {
    const ids = await args.request.json();

    const result = await feedBackDAL.deleteByIds(ids);
    return result;
  }

  /**
   * 更新
   * @param args
   * @returns
   */
  async update(args: any) {
    const dto = await args.request.json();
    const pyload = await joseJwt.getTokenUserIdByArgs(args);
    const data = {
      ...dto,
      userId: pyload.userId,
    };
    const result = await feedBackDAL.update(data);
    return result;
  }
}

export const feedBackService = new FeedbackService();
