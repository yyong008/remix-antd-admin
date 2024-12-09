import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import { blogCategoryDAL } from "@/dals/blog/BlogCategoryDAL";

import { joseJwt } from "@/libs/jose";

class BlogCategoryService {
  /**
   * 根据 id 获取博客分类
   * @param args
   * @returns
   */
  public async getById(args: LoaderFunctionArgs) {
    const payload = await joseJwt.getTokenUserIdByArgs(args);
    const total = await blogCategoryDAL.getCount();
    const list = await blogCategoryDAL.getListByUserId(payload.userId);
    const result = {
      total,
      list,
    };
    return result;
  }
  /**
   * 创建
   * @param args
   * @returns
   */
  public async create(args: ActionFunctionArgs) {
    const dto = await args.request.json();
    const payload = await joseJwt.getTokenUserIdByArgs(args);
    const data = {
      ...dto,
      userId: payload.userId,
    };
    const result = await blogCategoryDAL.create(data);
    return result;
  }
  /**
   * 根据 ids 删除
   * @param args
   * @returns
   */
  public async deleteByIds(args: ActionFunctionArgs) {
    const ids = await args.request.json();
    const result = await blogCategoryDAL.deleteByIds(ids);
    return result;
  }

  /**
   * 更新
   * @param args
   * @returns
   */
  public async update(args: ActionFunctionArgs) {
    const dto = await args.request.json();
    const payload = await joseJwt.getTokenUserIdByArgs(args);
    const data = {
      ...dto,
      userId: payload.userId,
    };
    const result = await blogCategoryDAL.update(data);
    return result;
  }
}

export const blogCategoryService = new BlogCategoryService();
