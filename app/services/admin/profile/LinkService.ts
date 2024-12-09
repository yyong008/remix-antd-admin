import { profileLinkDAL } from "@/dals/profile/ProfileLinkDAL";

import { getSearchParams } from "@/utils/server";
import { joseJwt } from "@/libs/jose";
import { urlSearchParams } from "@/utils/server/search";

class LinkService {
  /**
   * 根据 id 获取链接
   * @param args
   * @returns
   */
  async getById(args: any) {
    const id = Number(args.params.id);
    const result = await profileLinkDAL.getById(id);
    return result;
  }
  /**
   * 获取 links 列表
   * @param args
   * @returns
   */
  async getList(args: any) {
    const payload = await joseJwt.getTokenUserIdByArgs(args);
    const page = urlSearchParams.getPage(args.request);
    const pageSize = urlSearchParams.getPageSize(args.request);

    const total = await profileLinkDAL.getCount({ userId: payload.userId });
    const result = await profileLinkDAL.getList({
      where: {
        userId: payload.userId,
        categoryId: Number(getSearchParams(args.request, "category")),
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return {
      list: result,
      total,
    };
  }
  /**
   * 创建链接
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
    const result = await profileLinkDAL.create(data);
    return result;
  }
  /**
   * 根据 ids 删除链接
   * @param args
   * @returns
   *  */
  async deleteByIds(args: any) {
    const dto = args.request.json();
    const result = await profileLinkDAL.deleteByIds(dto.ids);
    return result;
  }

  /**
   * 更新链接
   * @param args
   * @returns
   *  */
  async update(args: any) {
    const dto = await args.request.json();
    const payload = await joseJwt.getTokenUserIdByArgs(args);
    const data = {
      ...dto,
      userId: payload.userId,
    };
    const result = await profileLinkDAL.update(data);
    return result;
  }
}

export const linkService = new LinkService();
