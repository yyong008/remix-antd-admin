import { roleDAL } from "@/dals/system/RoleDAL";
import { urlSearchParams } from "@/utils/server/search";

class RoleService {
  /**
   * 获取角色列表
   * @param args
   * @returns
   */
  async getList(args: any) {
    const page = urlSearchParams.getPage(args.request) || 1;
    const pageSize = urlSearchParams.getPageSize(args.request) || 10;
    const total = await roleDAL.getCount();
    const list = await roleDAL.getList({ page, pageSize });
    return {
      total,
      list,
    };
  }

  /**
   * 创建角色
   * @param args
   * @returns
   */
  async create(args: any) {
    const dto = await args.request.json();
    const result = await roleDAL.create(dto);
    return result;
  }

  /**
   * 更新
   * @param args
   * @returns
   */
  async update(args: any) {
    const { id, ...dto } = await args.request.json();
    const result = await roleDAL.update({ id, ...dto });

    return result;
  }

  /**
   * 删除
   * @param ids
   * @returns
   */
  async deleteByIds(ids: number[]) {
    const result = await roleDAL.deleteByIds(ids);
    return result;
  }
}

export const roleService = new RoleService();
