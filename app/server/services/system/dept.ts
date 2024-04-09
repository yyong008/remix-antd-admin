import prisma from "~/server/services/common/prisma";

/**
 * 获取所有部门列表
 * @returns 树形结构列表
 */
export const getDeptListTree = async () => {
  try {
    const dept = await prisma.department.findMany();

    return buildDeptTreeFunctional(dept, null);
  } catch (error) {
    console.log(error);
    return null;
  }
};

function buildDeptTreeFunctional(
  items: any[],
  parentId?: number | null,
): any[] {
  return items
    .filter((item) => item.parent_department_id === parentId)
    .map((item) => ({
      ...item,
      children: buildDeptTreeFunctional(items, item.id), // 递归构建子树
    }));
}
