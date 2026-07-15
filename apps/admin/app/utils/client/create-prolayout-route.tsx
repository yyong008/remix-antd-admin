import { AntdIcon } from "~/components/common/antd-icon";
import { isExternalLink } from "./utils";
import { resolveMenuLabel } from "./menu-label";

function createProLayoutRouteImpl(locale: string, items: any[], parentId: string | null): any[] {
  return items
    .filter((item) => item.parent_menu_id === parentId && item.isShow !== 0)
    .map((item) => ({
      ...item,
      name: resolveMenuLabel(item.name),
      path: isExternalLink(item.path)
        ? item.path
        : `/${locale ? `${locale}/` : ""}admin${item.path}`,
      key: item.id + item.path,
      hideInMenu: !item.isShow,
      icon: item.icon ? <AntdIcon name={item.icon} /> : item.icon,
      children: createProLayoutRouteImpl(locale, items, item.id),
    }))
    .sort((a, b) => a.orderNo - b.orderNo);
}

/**
 * 创建 prolayout 的路由列表（加入 TSX icon）
 * @param menus 传入字符串 icon 菜单
 * @returns
 */
export const createProLayoutRoute = (locale: string, menus: any): any => {
  return {
    routes: createProLayoutRouteImpl(locale, menus, null),
  };
};
