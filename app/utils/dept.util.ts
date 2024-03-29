export function DeptlistToTree(list: any[], parentId = null) {
  const deptTree: any[] = [];

  list.forEach((dept: any) => {
    if (dept.parentId === parentId) {
      const subMenus = DeptlistToTree(list, dept.id);
      if (subMenus.length) {
        dept.children = subMenus;
      }
      deptTree.push(dept);
    }
  });

  return deptTree;
}
