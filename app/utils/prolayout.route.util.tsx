import AntdIcon from "~/components/common/AntdIcon";
import { ADMIN_ROUTE_PREFIX } from "~/constants";

function buildMenuTreeFunctional(
  lang: string,
  items: any[],
  parentId?: number | null,
): any[] {
  return items
    .filter((item) => item.parent_menu_id === parentId)
    .map((item) => ({
      ...item,
      path: `/${lang}/${ADMIN_ROUTE_PREFIX}${item.path}`,
      key: item.key + item.path, // https://github.com/ant-design/pro-components/issues/2511
      hideInMenu: !item.isShow,
      icon: item.icon ? <AntdIcon name={item.icon} /> : item.icon,
      children: buildMenuTreeFunctional(lang, items, item.id), // 递归构建子树
    }));
}

/**
 * 创建 prolayout 的路由列表（加入 TSX icon）
 * @param menus 传入字符串 icon 菜单
 * @returns
 */
export const createProLayoutRoute = (lang: string, menus: any) => {
  return {
    routes: buildMenuTreeFunctional(lang, menus, null),
  };
};
