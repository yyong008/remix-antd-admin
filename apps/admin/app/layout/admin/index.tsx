import type { ItemType } from "antd/es/menu/interface";
import type { MenuProps } from "antd";
import type { ReactNode } from "react";

import { m } from "~/paraglide/messages";

import {
  GithubFilled,
  HomeFilled,
  InfoCircleFilled,
  LogoutOutlined,
  QuestionCircleFilled,
  UserOutlined,
} from "@ant-design/icons";
import {
  App as AntdApp,
  Avatar,
  Breadcrumb,
  Button,
  Dropdown,
  Layout,
  Menu,
  Space,
  Spin,
  theme,
  Watermark,
} from "antd";

import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams, useMatches, useNavigate, Outlet } from "react-router";
import { Footer, LocaleSwitcher, ThemeSwitcher } from "~/components/common";
import { useLogout } from "~/api-client/queries/auth/auth";
import { useSession } from "~/session/provider";
import { useUserInfo } from "~/api-client/queries/system/system-user";
import { ClientOnly } from "~/components/common/client-only";
import { createProLayoutRoute } from "~/utils/client";
import styles from "./index.module.css";

export { middleware } from "./middleware";

const { Header, Sider, Content } = Layout;

const SIDER_EXPANDED_PX = 248;
const SIDER_COLLAPSED_PX = 80;

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

function getAdminShellMenuState(
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
    <Link to={path} className={styles.menuItemLink}>
      {children}
    </Link>
  );
}

export function buildAdminMenuItems(routes: AdminRouteNode[]): MenuProps["items"] {
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
          children: buildAdminMenuItems(visibleChildren),
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

export type AdminHeaderUser = {
  name?: string | null;
  nickname?: string | null;
  email?: string | null;
  avatar?: string | null;
};

function displayName(u: AdminHeaderUser) {
  const n = u.nickname?.trim() || u.name?.trim();
  return n || u.email?.trim() || m.layout_user_fallback();
}

function AvatarDropDown({ user }: { user: AdminHeaderUser }) {
  const navigate = useNavigate();
  const { locale } = useParams();
  const { token } = theme.useToken();
  const { mutate: signOut } = useLogout();
  const { user: sessionUser, isLoading } = useSession();

  if (isLoading) {
    return <Spin size="small" />;
  }

  if (!sessionUser) {
    return (
      <Button
        type="primary"
        size="middle"
        onClick={() => navigate(`/${locale ? `${locale}/` : ""}auth/login`)}
      >
        {m.auth_sign_in_title()}
      </Button>
    );
  }

  const title = displayName(user);
  const subtitle = user.email?.trim() || "";

  const items: MenuProps["items"] = [
    {
      key: "profile-center",
      icon: <UserOutlined />,
      label: m.layout_profile_center(),
      onClick: () => {
        navigate(`/${locale ? `${locale}/` : ""}admin/profile/account`);
      },
    },
    { type: "divider" },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: m.layout_log_out(),
      danger: true,
      onClick: () => {
        signOut();
      },
    },
  ];

  const avatarSrc = user.avatar?.trim() || undefined;

  return (
    <Dropdown
      trigger={["click"]}
      placement="bottomRight"
      menu={{ items }}
      popupRender={(menu) => (
        <div
          className={styles.dropdownPopup}
          style={{
            border: `1px solid ${token.colorBorderSecondary}`,
            background: token.colorBgElevated,
          }}
        >
          <div
            className={styles.dropdownHeader}
            style={{ borderBottom: `1px solid ${token.colorBorderSecondary}` }}
          >
            <Avatar src={avatarSrc} size={48} className={styles.dropdownAvatar}>
              {title.slice(0, 1).toUpperCase()}
            </Avatar>
            <div className={styles.dropdownInfo}>
              <div className={styles.dropdownName} style={{ color: token.colorText }} title={title}>
                {title}
              </div>
              {subtitle ? (
                <div
                  className={styles.dropdownEmail}
                  style={{ color: token.colorTextSecondary }}
                  title={subtitle}
                >
                  {subtitle}
                </div>
              ) : null}
            </div>
          </div>
          <div className={styles.dropdownMenu}>{menu}</div>
        </div>
      )}
    >
      <button
        type="button"
        aria-label={m.layout_user_menu_aria()}
        className={styles.avatarBtn}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(0,0,0,0.04)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
        }}
      >
        <Avatar src={avatarSrc} size="default">
          {title.slice(0, 1).toUpperCase()}
        </Avatar>
      </button>
    </Dropdown>
  );
}

function MenuFooterRender({ collapsed }: { collapsed?: boolean }) {
  if (collapsed) return undefined;
  return (
    <div className={styles.footer} style={{ paddingInline: 16, paddingBlock: 16 }}>
      <p className={styles.footerCopyright}>{m.layout_copyright()}</p>
      <p className={styles.footerMade}>{m.layout_made_with_love()}</p>
    </div>
  );
}

type AdminShellLayoutProps = {
  route: { routes: AdminRouteNode[] };
  loading: boolean;
  user: AdminHeaderUser;
  children: ReactNode;
};

function AdminShellLayout(props: AdminShellLayoutProps) {
  const { route, loading, user, children } = props;
  const location = useLocation();
  const { locale } = useParams();
  const navigate = useNavigate();
  const { token } = theme.useToken();

  const [, setPathname] = useState(location.pathname);
  useEffect(() => {
    setPathname(location.pathname);
  }, [location.pathname]);

  const menuItems = useMemo(() => buildAdminMenuItems(route.routes), [route.routes]);

  const dashboardHref = `/${locale ? `${locale}/` : ""}admin/dashboard`;

  const { selectedKeys, openKeys: derivedOpenKeys } = useMemo(
    () => getAdminShellMenuState(location.pathname, route.routes),
    [location.pathname, route.routes],
  );

  const matches = useMatches();

  const handleMatches = useMemo(() => {
    const last = matches[matches.length - 1];
    if (last?.handle && typeof last?.handle === "function") {
      return last?.handle?.({ params: { locale } });
    }
    return { breadcrumb: [] };
  }, [matches, locale]);

  const breadcrumbItems = useMemo(() => {
    const items: { title: ReactNode }[] = [];
    if (handleMatches.breadcrumb.length === 0) {
      return items;
    }
    for (let i = 0; i < handleMatches.breadcrumb.length; i++) {
      const match = handleMatches.breadcrumb[i];
      items.push({ title: match.label });
    }
    return items;
  }, [handleMatches, dashboardHref]);

  const [openKeys, setOpenKeys] = useState<string[]>(derivedOpenKeys);
  useEffect(() => {
    setOpenKeys(derivedOpenKeys);
  }, [derivedOpenKeys]);

  const onOpenChange = useCallback((keys: string[]) => {
    setOpenKeys(keys);
  }, []);

  const [collapsed, setCollapsed] = useState(false);

  const goGithub = useCallback(() => {
    let aTag: any = document.createElement("a");
    aTag.setAttribute("href", "https://github.com/yyong008/remix-antd-admin");
    aTag.setAttribute("target", "_blank");
    aTag.click();
    aTag = null;
  }, []);

  const goHome = useCallback(() => {
    navigate(`/${locale ? `${locale}/` : ""}`);
  }, [navigate, locale]);

  const mainGutterStart = collapsed ? SIDER_COLLAPSED_PX : SIDER_EXPANDED_PX;

  return (
    <Watermark content="React Router Antd Admin">
      <Layout style={{ minHeight: "100dvh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          collapsedWidth={SIDER_COLLAPSED_PX}
          onCollapse={setCollapsed}
          width={SIDER_EXPANDED_PX}
          className={styles.sider}
          theme="dark"
        >
          <div className={styles.siderInner}>
            <div
              className={styles.logoBox}
              style={{ padding: collapsed ? "16px 12px" : "20px 16px" }}
            >
              <Link
                to={dashboardHref}
                className={styles.logoLink}
                style={{ justifyContent: collapsed ? "center" : "flex-start", opacity: 1 }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <span className={styles.logoIcon}>
                  <img
                    src="/logo.png"
                    alt=""
                    width={28}
                    height={28}
                    className={styles.logoIconImg}
                  />
                </span>
                {!collapsed && (
                  <span className={styles.logoTextWrap}>
                    <span className={styles.logoTitle}>React Router</span>
                    <span className={styles.logoSubtitle}>Antd Admin</span>
                  </span>
                )}
              </Link>
            </div>

            <div className={styles.menuScroll} style={{ padding: "12px 8px 8px" }}>
              <Menu
                theme="dark"
                mode="inline"
                selectedKeys={selectedKeys}
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                className={styles.menuInner}
                items={menuItems}
              />
            </div>

            <MenuFooterRender collapsed={collapsed} />
          </div>
        </Sider>

        <Layout className={styles.mainLayout} style={{ marginInlineStart: mainGutterStart }}>
          <Header
            className={styles.header}
            style={{
              paddingInline: 20,
              paddingBlock: 12,
              background: token.colorBgContainer,
              borderBottomColor: token.colorBorderSecondary,
            }}
          >
            <div className={styles.headerLeft}>
              <Breadcrumb items={breadcrumbItems} />
            </div>
            <div className={styles.headerRight}>
              <Space size="middle">
                <HomeFilled onClick={goHome} />
                <InfoCircleFilled />
                <QuestionCircleFilled />
                <GithubFilled onClick={goGithub} />
              </Space>
              <LocaleSwitcher />
              <ThemeSwitcher />
              <AvatarDropDown user={user} />
            </div>
          </Header>

          <Content className={styles.contentArea}>
            <div className={styles.contentInner}>
              <Spin spinning={loading} className={styles.contentSpin}>
                {children}
              </Spin>
            </div>
          </Content>

          <div className={styles.footerArea}>
            <Footer />
          </div>
        </Layout>
      </Layout>
    </Watermark>
  );
}

function AdminLayout() {
  const { locale } = useParams();
  const { data, isLoading } = useUserInfo();
  const sessionCtx = useSession();

  const menu = data?.menu ?? [];
  const userInfo = data?.userInfo;
  const route = useMemo(() => createProLayoutRoute(locale!, menu), [locale, menu]);

  const headerUser = useMemo(() => {
    const api = userInfo as {
      name?: string | null;
      nickname?: string | null;
      email?: string | null;
      avatar?: string | null;
    } | null;
    const su = sessionCtx?.user as
      | { name?: string | null; email?: string | null; image?: string | null }
      | null
      | undefined;
    return {
      name: api?.name ?? su?.name ?? null,
      nickname: api?.nickname ?? null,
      email: api?.email ?? su?.email ?? null,
      avatar: api?.avatar ?? su?.image ?? null,
    };
  }, [userInfo, sessionCtx?.user]);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <ClientOnly fallback={<>sdf</>}>
      {() => (
        <AntdApp>
          <AdminShellLayout loading={isLoading} route={route} user={headerUser}>
            <Outlet />
          </AdminShellLayout>
        </AntdApp>
      )}
    </ClientOnly>
  );
}

export default memo(AdminLayout);
