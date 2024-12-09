import { deptDAL } from "@/dals/system/DeptDAL";
import { urlSearchParams } from "@/utils/server/search";

const buildDeptListToTree = (items: any[], parentId?: number | null): any =>
  items
    .filter((item) => item.parent_department_id === parentId)
    .map((item) => ({
      ...item,
      children: buildDeptListToTree(items, item.id), // 递归构建子树
    }));

// services
class DeptService {
  /**
   * 获取列表
   * @param args
   * @returns
   */
  async getList(args: any) {
    const page = urlSearchParams.getPage(args.request) || 1;
    const pageSize = urlSearchParams.getPageSize(args.request) || 10;

    const total = await deptDAL.getCount();
    const _list = await deptDAL.getList({ page, pageSize });

    const list = buildDeptListToTree(_list, null);
    return {
      total,
      list,
    };
  }

  /**
   * 创建科室
   * @param args
   * @returns
   */
  async create(args: any) {
    const dto = await args.request.json();
    const result = await deptDAL.create(dto);
    return result;
  }

  /**
   * 更新科室
   * @param args
   * @returns
   */
  async update(args: any) {
    const dto = await args.request.json();
    const result = await deptDAL.update(dto);
    return result;
  }

  /**
   * 根据 ids 删除科室
   * @param args
   * @returns
   */
  async deleteByIds(args: any) {
    const dto = await args.request.json();
    const result = await deptDAL.deleteByIds(dto);
    return result;
  }
}

export const deptService = new DeptService();
