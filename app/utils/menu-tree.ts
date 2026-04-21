export type MenuFlatRow = {
  id: string;
  name: string;
  type?: number | null;
  parent_menu_id?: string | null;
  orderNo?: number | null;
  path?: string | null;
  path_file?: string | null;
  icon?: string | null;
  permission?: string | null;
  isShow?: number | null;
  isLink?: number | null;
  isCache?: number | null;
  status?: number | null;
  description?: string | null;
  remark?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  [key: string]: unknown;
};

export type MenuTreeNode = MenuFlatRow & { children?: MenuTreeNode[] };

/**
 * Build a nested menu tree from a flat list (same ids as DB). Siblings sorted by `orderNo` then name.
 */
export function buildMenuTreeFromFlat(flat: MenuFlatRow[]): MenuTreeNode[] {
  const map = new Map<string, MenuTreeNode>();
  for (const m of flat) {
    map.set(m.id, { ...m, children: [] });
  }
  const roots: MenuTreeNode[] = [];
  for (const node of map.values()) {
    const pid = node.parent_menu_id;
    if (pid && map.has(pid)) {
      map.get(pid)!.children!.push(node);
    } else {
      roots.push(node);
    }
  }
  const sortNested = (nodes: MenuTreeNode[]) => {
    nodes.sort((a, b) => {
      const ao = a.orderNo ?? 0;
      const bo = b.orderNo ?? 0;
      if (ao !== bo) return ao - bo;
      return String(a.name).localeCompare(String(b.name));
    });
    for (const n of nodes) {
      if (n.children?.length) sortNested(n.children);
    }
  };
  sortNested(roots);
  return roots;
}
