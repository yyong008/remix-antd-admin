import { blogDAL } from "@/dals/blog/BlogDAL";
import { joseJwt } from "@/libs/jose";
import { urlSearchParams } from "@/utils/server/search";

class BlogService {
  /**
   * 根据 id
   * @param args
   * @returns
   */
  async getById(args: any) {
    const id = Number(args.params.id);
    const result = await blogDAL.getById(id);
    return result;
  }

  /**
   *
   * @param args 根据条件获取列表
   * @returns
   */
  async getList(args: any) {
    const payload = await joseJwt.getTokenUserIdByArgs(args);
    const categoryId = urlSearchParams.getCategoryId(args.request);
    const tagId = urlSearchParams.getTagId(args.request);

    const total = await blogDAL.getCount();
    const list = await blogDAL.getListByIds({
      page: urlSearchParams.getPage(args.request) || 1,
      pageSize: urlSearchParams.getPageSize(args.request) || 10,
      userId: payload.userId,
      categoryId,
      tagId,
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
    const payload = await joseJwt.getTokenUserIdByArgs(args);
    const data = {
      ...dto,
      publishedAt: new Date(dto.publishedAt),
      userId: payload.userId,
    };
    const result = await blogDAL.create(data);
    return result;
  }
  /**
   * 删除
   * @param args
   * @returns
   */
  async deleteByIds(args: any) {
    const { ids } = await args.request.json();
    const result = await blogDAL.deleteByIds(ids);
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
      publishedAt: new Date(dto.publishedAt),
      userId: payload.userId,
    };
    const result = await blogDAL.update(data);
    return result;
  }
}

export const blogService = new BlogService();
