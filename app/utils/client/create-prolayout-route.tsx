import { AntdIcon } from "~/components/common/antd-icon";
import { isExternalLink } from "./utils";

function createProLayoutRouteImpl(
  lang: string,
  items: any[],
  parentId: number | null,
  t: (v: string) => string,
): any[] {
  return items
    .filter((item) => item.parent_menu_id === parentId)
    .map((item) => ({
      ...item,
      name: t(item.name),
      path: isExternalLink(item.path)
        ? item.path
        : `/${lang}/admin${item.path}`,
      key: item.id + item.path, // https://github.com/ant-design/pro-components/issues/2511
      hideInMenu: !item.isShow,
      icon: item.icon ? <AntdIcon name={item.icon} /> : item.icon,
      children: createProLayoutRouteImpl(lang, items, item.id, t), // 递归构建子树
    }))
    .sort((a, b) => a.orderNo - b.orderNo);
}

/**
 * 创建 prolayout 的路由列表（加入 TSX icon）
 * @param menus 传入字符串 icon 菜单
 * @returns
 */
export const createProLayoutRoute = (lang: string, menus: any, t: any): any => {
  return {
    routes: createProLayoutRouteImpl(lang, menus, null, t),
  };
};
