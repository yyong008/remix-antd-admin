import AntdIcon from "~/components/common/AntdIcon";

/**
 * 重构菜单的 icon 为 React 组件
 * @param menuItem 路由
 */
function refactorMenu(menuItem: any) {
  const { icon } = menuItem;
  menuItem.hideInMenu = !menuItem.isShow;
  if (icon) {
    menuItem.icon = <AntdIcon name={icon} />;
  }

  menuItem.children?.forEach((childMenuItem: any) => {
    refactorMenu(childMenuItem);
  });
}

/**
 * 创建 prolayout 的路由列表（加入 TSX icon）实现
 * @param routes
 * @returns
 */
function createProLayoutRouteImpl(routes: any[]) {
  routes.forEach((route) => {
    refactorMenu(route);
  });

  return routes;
}

/**
 * 创建 prolayout 的路由列表（加入 TSX icon）
 * @param menus 传入字符串 icon 菜单
 * @returns
 */
export const createProLayoutRoute = (menus: any) => {
  const route = {
    routes: createProLayoutRouteImpl(menus ?? []),
  };
  return route;
};
