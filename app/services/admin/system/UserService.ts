import { getSearchParamsPage, getSearchParamsPageSize } from "@/utils/server";

import { getSearchParams } from "@/utils/server/search";
import { userDAL } from "@/dals/system/UserDAL";

class UserService {
  /**
   * 获取用户列表
   * @param args
   * @returns { list, total }
   */
  async getList(args: any) {
    const page = getSearchParamsPage(args.request);
    const pageSize = getSearchParamsPageSize(args.request);
    const name = getSearchParams(args.request, "name");
    const total = await userDAL.getCount();
    const list = await userDAL.getList({
      page,
      pageSize,
      name: name ? name : undefined,
    });

    return {
      total,
      list,
    };
  }
  /**
   * 创建用户
   * @param args
   * @returns
   */
  async create(args: any) {
    const dto = await args.request.json();
    const result = await userDAL.create(dto);
    return result;
  }
  /**
   * 更新用户
   * @param args
   * @returns
   */
  async update(args: any) {
    const dto = await args.request.json();
    const result = await userDAL.update(dto);
    return result;
  }
  /**
   * 根据 ids 删除用户
   * @param args
   * @returns
   */
  async deleteByIds(args: any) {
    const dto = await args.request.json();
    const result = await userDAL.deleteByIds(dto);
    return result;
  }
}

export const userService = new UserService();
