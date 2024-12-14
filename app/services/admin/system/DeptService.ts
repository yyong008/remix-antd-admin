import { deptDAL } from "@/dals/system/DeptDAL";
// import { urlSearchParams } from "@/utils/server/search";

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
    const total = await deptDAL.getCount();
    const _list = await deptDAL.getAll();

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
    if (dto.parent_department_id) {
      const parent = await deptDAL.getById(dto.parent_department_id);
      if (!parent) {
        throw new Error("上级科室不存在");
      }
    }
    const result = await deptDAL.create({
      name: dto.name,
      description: dto.description,
      orderNo: dto.orderNo,
      ...dto,
    });
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
