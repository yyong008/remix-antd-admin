import type { ItemType } from "antd/es/menu/interface";
import type { MenuProps } from "antd";
import type { ReactNode } from "react";

import { MenuItemLink, MenuItemOutLink } from "@/components/common";
import { isExternalLink } from "~/utils/client/utils";

export type AdminRouteNode = {
  name: string;
  path: string;
  key: string;
  hideInMenu?: boolean;
  icon?: ReactNode;
  children?: AdminRouteNode[];
  isLink?: number | boolean | null;
};

type PathMatch = {
  key: string;
  pathLen: number;
  openKeys: string[];
  trail: AdminRouteNode[];
};

function matchAdminMenuState(pathname: string, routes: AdminRouteNode[]): PathMatch | null {
  function visit(items: AdminRouteNode[], prefix: AdminRouteNode[]): PathMatch | null {
    let best: PathMatch | null = null;
    for (const item of items) {
      if (item.hideInMenu) continue;
      const p = String(item.path ?? "");
      if (p && !isExternalLink(p)) {
        const matches = pathname === p || pathname.startsWith(`${p}/`);
        if (matches) {
          const plen = p.length;
          const trail = [...prefix, item];
          if (!best || plen > best.pathLen) {
            best = {
              key: item.key,
              pathLen: plen,
              openKeys: prefix.map((n) => n.key),
              trail,
            };
          }
        }
      }
      if (item.children?.length) {
        const sub = visit(item.children, [...prefix, item]);
        if (sub && (!best || sub.pathLen > best.pathLen)) {
          best = sub;
        }
      }
    }
    return best;
  }

  return visit(routes, []);
}

export function getAdminShellMenuState(
  pathname: string,
  routes: AdminRouteNode[],
): {
  selectedKeys: string[];
  openKeys: string[];
  trail: AdminRouteNode[];
} {
  const bestMatch = matchAdminMenuState(pathname, routes);
  return bestMatch
    ? { selectedKeys: [bestMatch.key], openKeys: bestMatch.openKeys, trail: bestMatch.trail }
    : { selectedKeys: [], openKeys: [], trail: [] };
}

export function matchMenuSelection(
  pathname: string,
  routes: AdminRouteNode[],
): { selectedKeys: string[]; openKeys: string[] } {
  const { selectedKeys, openKeys } = getAdminShellMenuState(pathname, routes);
  return { selectedKeys, openKeys };
}

/** 与侧栏同一套匹配规则下的菜单路径，用于面包屑等 */
export function matchAdminBreadcrumbTrail(
  pathname: string,
  routes: AdminRouteNode[],
): AdminRouteNode[] {
  return getAdminShellMenuState(pathname, routes).trail;
}

export function buildAdminMenuItems(
  routes: AdminRouteNode[],
  setPathname: (path: string) => void,
): MenuProps["items"] {
  return routes
    .filter((r) => !r.hideInMenu)
    .map((item): ItemType => {
      const visibleChildren = item.children?.filter((c) => !c.hideInMenu) ?? [];
      const label =
        visibleChildren.length > 0 ? (
          <span>{item.name}</span>
        ) : item.isLink ? (
          <MenuItemOutLink path={item.path} dom={<span>{item.name}</span>} />
        ) : (
          <MenuItemLink path={item.path} setPathname={setPathname} dom={<span>{item.name}</span>} />
        );
      if (visibleChildren.length) {
        return {
          key: item.key,
          icon: item.icon,
          label,
          children: buildAdminMenuItems(visibleChildren, setPathname),
        };
      }
      return {
        key: item.key,
        icon: item.icon,
        label,
      };
    });
}
