import type { ItemType } from "antd/es/menu/interface";
import type { MenuProps } from "antd";
import type { ReactNode } from "react";
import { Link } from "react-router";

export type AdminRouteNode = {
  name: string;
  path: string;
  key: string;
  hideInMenu?: boolean;
  icon?: ReactNode;
  children?: AdminRouteNode[];
  isLink?: number | boolean | null;
  isShow?: number | boolean | null;
};

type PathMatch = {
  key: string;
  pathLen: number;
  openKeys: string[];
  trail: AdminRouteNode[];
};

function isExternalLink(path: string): boolean {
  return path.startsWith("http://") || path.startsWith("https://");
}

function matchAdminMenuState(pathname: string, routes: AdminRouteNode[]): PathMatch | null {
  function visit(items: AdminRouteNode[], prefix: AdminRouteNode[]): PathMatch | null {
    let best: PathMatch | null = null;
    for (const item of items) {
      const p = String(item.path ?? "");
      if (!p || isExternalLink(p)) {
        if (item.children?.length) {
          const sub = visit(item.children, [...prefix, item]);
          if (sub && (!best || sub.pathLen > best.pathLen)) {
            best = sub;
          }
        }
        continue;
      }

      const menuSegs = p.split("/").filter(Boolean);
      const urlSegs = pathname.split("/").filter(Boolean);

      let i = 0;
      for (; i < menuSegs.length && i < urlSegs.length; i++) {
        if (menuSegs[i] !== urlSegs[i] && !menuSegs[i].startsWith(":")) break;
      }

      if (i === menuSegs.length) {
        if (!best || menuSegs.length > best.pathLen) {
          best = {
            key: item.key,
            pathLen: menuSegs.length,
            openKeys: prefix.map((n) => n.key),
            trail: [...prefix, item],
          };
        }
      }

      if (item.children?.length) {
        const sub = visit(item.children, [...prefix, item]);
        if (sub && (!best || sub.pathLen > best.pathLen)) best = sub;
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

export function matchAdminBreadcrumbTrail(
  pathname: string,
  routes: AdminRouteNode[],
): AdminRouteNode[] {
  return getAdminShellMenuState(pathname, routes).trail;
}

function MenuItemLink({ path, children }: { path: string; children: ReactNode }) {
  return (
    <Link
      to={path}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      {children}
    </Link>
  );
}

export function buildAdminMenuItems(
  routes: AdminRouteNode[],
  setPathname: (path: string) => void,
): MenuProps["items"] {
  return routes
    .filter((r) => !r.hideInMenu && r.isShow !== 0)
    .map((item): ItemType => {
      const visibleChildren = item.children?.filter((c) => c.isShow !== 0) ?? [];
      const label = <span>{item.name}</span>;
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
        label: item.isLink ? (
          <a href={item.path} target="_blank" rel="noopener noreferrer">
            {item.name}
          </a>
        ) : (
          <MenuItemLink path={item.path}>{item.name}</MenuItemLink>
        ),
      };
    });
}