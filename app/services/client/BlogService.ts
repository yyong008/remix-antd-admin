import { blogCategoryDAL } from "@/dals/blog/BlogCategoryDAL";
import { blogDAL } from "@/dals/blog/BlogDAL";
import { urlSearchParams } from "@/utils/server/search";

class BlogService {
  /**
   * 根据 id
   * @param args
   * @returns
   */
  async getById(args: any) {
    const id = Number(args.params.id);
    const result = await blogCategoryDAL.getById(id);
    return result;
  }

  /**
   *
   * @param args 根据条件获取列表
   * @returns
   */
  async getList(args: any) {
    const page = urlSearchParams.getPage(args.request);
    const pageSize = urlSearchParams.getPageSize(args.request);

    const data = {
      page,
      pageSize,
    };
    const total = await blogDAL.getCount();
    const list = await blogDAL.getPage(data);
    return {
      total,
      list,
    };
  }
}

export const blogService = new BlogService();
