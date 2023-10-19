import * as _icons from "@ant-design/icons";

function handleRoutesImpl(routes) {
  for (const route of routes) {
    buildMenu(route);
  }

  return routes;
}

function buildMenu(menuItem) {
  const { children, icon } = menuItem;
  // 获取图标组件
  let IconComponent;
  if (menuItem.icon) {
    IconComponent = _icons[icon];
  }

  if (IconComponent) {
    menuItem.icon = <IconComponent />;
  }

  // 如果当前菜单项有子菜单，递归处理子菜单
  if (children && children.length > 0) {
    for (const child of children) {
      buildMenu(child);
    }
  }
}

export const handleRoutes = (route: any) => {
  const routes = route.route.routes;
  route.route.routes = handleRoutesImpl(routes ?? []);
  return route;
};
