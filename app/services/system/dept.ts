import prisma from "~/services/common/db.server";
import { DeptlistToTree } from "~/utils/dept.util";

/**
 * 获取所有部门列表
 * @returns 树形结构列表
 */
export const getDeptListTree = async () => {
  try {
    const dept = await prisma.department.findMany();

    return DeptlistToTree(dept);
  } catch (error) {
    console.log(error);
    return null;
  }
};
