import { type LoaderFunctionArgs } from "@remix-run/node";
import { joseJwt } from "@/libs/jose";
import { blogTagDAL } from "@/dals/blog/BlogTagDAL";

class BlogTagService {
  /**
   * 获取博客标签列表
   * @param args
   * @returns
   */
  async getList(args: LoaderFunctionArgs) {
    const payload = await joseJwt.getTokenUserIdByArgs(args);
    const total = await blogTagDAL.getCount();
    const list = await blogTagDAL.getByUserId(payload.userId!);
    return { total, list };
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
    const result = await blogTagDAL.create(data);
    return result;
  }
  /**
   * 删除
   * @param args
   * @returns
   */
  async deleteByIds(args: any) {
    const ids = await args.request.json();
    const result = await blogTagDAL.deleteBlogTagByIds(ids);
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
    const result = await blogTagDAL.update(data);
    return result;
  }
}

export const blogTagService = new BlogTagService();
