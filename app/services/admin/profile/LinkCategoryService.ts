import { profileLinkCategoryDAL } from "@/dals/profile/ProfileLinkCategoryDAL";

import { joseJwt } from "@/libs/jose";
import { urlSearchParams } from "@/utils/server/search";

class LinkCategoryService {
  /**
   * 根据 id 获取链接分类
   * @param args
   * @returns
   */
  async getById(args: any) {
    const id = Number(args.params.id);
    const result = await profileLinkCategoryDAL.getById(id);
    return result;
  }

  /**
   * 获取链接分类列表
   * @param args
   * @returns
   */
  async getList(args: any) {
    const payload = await joseJwt.getTokenUserIdByArgs(args);
    const page = urlSearchParams.getPage(args.request);
    const pageSize = urlSearchParams.getPageSize(args.request);

    const data = {
      userId: payload.userId,
      page,
      pageSize,
    };
    const total = await profileLinkCategoryDAL.getCount();
    const list = await profileLinkCategoryDAL.getListByUserId(data);

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
    const payload = await joseJwt.getTokenUserIdByArgs(args);

    const data = {
      ...dto,
      userId: payload.userId,
    };

    const result = await profileLinkCategoryDAL.create(data);
    return result;
  }

  /**
   * 根据 ids 进行删除
   * @param args
   * @returns
   */
  async deleteByIds(args: any) {
    const ids = args.request.json();
    const result = await profileLinkCategoryDAL.deleteByIds(ids);
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
    const result = await profileLinkCategoryDAL.update(data);
    return result;
  }
}

export const linkCategoryService = new LinkCategoryService();
