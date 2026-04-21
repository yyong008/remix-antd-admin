import { Footer } from "@/components/common";
import { prolayoutConfig } from "@/config/prolayout";
import { info } from "@/config/project";
import {
  Breadcrumb,
  ConfigProvider,
  Grid,
  Layout,
  Menu,
  Space,
  Spin,
  theme,
  Watermark,
} from "antd";
import type { ReactNode } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, href, useLocation, useParams } from "react-router";

import { isExternalLink } from "~/utils/client/utils";

import { AvatarDropDown, type AdminHeaderUser } from "./AvatarDropdown";
import { MenuFooterRender } from "./MenuFooterRender";
import { createActionRenderWrap } from "./createActionsRender";
import {
  type AdminRouteNode,
  buildAdminMenuItems,
  getAdminShellMenuState,
} from "./admin-menu-helpers";

const { Header, Sider, Content } = Layout;

const SIDER_EXPANDED_PX = 248;
const SIDER_COLLAPSED_PX = 80;

type AdminShellLayoutProps = {
  route: { routes: AdminRouteNode[] };
  loading: boolean;
  user: AdminHeaderUser;
  children: ReactNode;
};

export function AdminShellLayout(props: AdminShellLayoutProps) {
  const { route, loading, user, children } = props;
  const location = useLocation();
  const { locale } = useParams();
  const screens = Grid.useBreakpoint();
  const isMobile = !screens.md;
  const { token } = theme.useToken();

  const [, setPathname] = useState(location.pathname);
  useEffect(() => {
    setPathname(location.pathname);
  }, [location.pathname]);

  const menuItems = useMemo(() => buildAdminMenuItems(route.routes, setPathname), [route.routes]);

  const dashboardHref = href("/:locale?/admin/dashboard", { locale });

  const {
    selectedKeys,
    openKeys: derivedOpenKeys,
    trail,
  } = useMemo(
    () => getAdminShellMenuState(location.pathname, route.routes),
    [location.pathname, route.routes],
  );

  const homeLabel = locale === "en" ? "Home" : "首页";
  const unknownPageLabel = locale === "en" ? "Page" : "页面";

  const breadcrumbItems = useMemo(() => {
    const items: { title: ReactNode }[] = [
      {
        title: (
          <Link to={dashboardHref} style={{ color: "inherit" }}>
            {homeLabel}
          </Link>
        ),
      },
    ];
    if (trail.length === 0) {
      items.push({ title: unknownPageLabel });
      return items;
    }
    for (let i = 0; i < trail.length; i++) {
      const node = trail[i];
      const isLast = i === trail.length - 1;
      if (isLast) {
        items.push({ title: node.name });
      } else if (isExternalLink(node.path)) {
        items.push({
          title: (
            <a
              href={node.path}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "inherit" }}
            >
              {node.name}
            </a>
          ),
        });
      } else {
        items.push({
          title: (
            <Link to={node.path} style={{ color: "inherit" }}>
              {node.name}
            </Link>
          ),
        });
      }
    }
    return items;
  }, [trail, dashboardHref, homeLabel, unknownPageLabel]);

  const [openKeys, setOpenKeys] = useState<string[]>(derivedOpenKeys);
  useEffect(() => {
    setOpenKeys(derivedOpenKeys);
  }, [derivedOpenKeys]);

  const onOpenChange = useCallback((keys: string[]) => {
    setOpenKeys(keys);
  }, []);

  const [collapsed, setCollapsed] = useState(false);

  const actions = useMemo(() => createActionRenderWrap()({ isMobile }), [isMobile]);

  const primary = token.colorPrimary;
  const darkSelectedBg =
    typeof primary === "string" && /^#[0-9a-fA-F]{6}$/.test(primary)
      ? `${primary}28`
      : "rgba(22, 119, 255, 0.22)";

  const mainGutterStart = collapsed ? SIDER_COLLAPSED_PX : SIDER_EXPANDED_PX;

  const shellMenuTheme = {
    components: {
      Layout: {
        triggerBg: "#0d1219",
        triggerColor: "rgba(255, 255, 255, 0.72)",
      },
      Menu: {
        itemBorderRadius: 10,
        itemMarginInline: 8,
        itemMarginBlock: 3,
        itemHeight: 42,
        iconSize: 17,
        collapsedIconSize: 17,
        iconMarginInlineEnd: 12,
        darkItemBg: "transparent",
        darkSubMenuItemBg: "transparent",
        darkItemHoverBg: "rgba(255, 255, 255, 0.06)",
        darkItemHoverColor: "rgba(255, 255, 255, 0.95)",
        darkItemSelectedBg: darkSelectedBg,
        darkItemSelectedColor: "#fff",
        darkPopupBg: "#141a24",
        popupBg: "#141a24",
        activeBarWidth: 0,
      },
    },
  };

  return (
    <Watermark content={info.WaterMark}>
      <ConfigProvider theme={shellMenuTheme}>
        <Layout style={{ minHeight: "100dvh" }}>
          <Sider
            collapsible
            collapsed={collapsed}
            collapsedWidth={SIDER_COLLAPSED_PX}
            onCollapse={setCollapsed}
            width={SIDER_EXPANDED_PX}
            className="admin-shell-sider"
            style={{
              position: "fixed",
              insetInlineStart: 0,
              top: 0,
              height: "100dvh",
              overflow: "hidden",
              zIndex: 100,
              borderInlineEnd: "1px solid rgba(255, 255, 255, 0.06)",
              background: "linear-gradient(165deg, #161c28 0%, #10151f 42%, #0b0f16 100%)",
              boxShadow: "4px 0 32px rgba(0, 0, 0, 0.12)",
            }}
            theme="dark"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                minHeight: 0,
                flex: 1,
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  padding: collapsed ? "16px 12px" : "20px 16px",
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <Link
                  to={dashboardHref}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    textDecoration: "none",
                    outline: "none",
                    transition: "opacity 0.2s",
                    opacity: 1,
                    justifyContent: collapsed ? "center" : "flex-start",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  <span
                    style={{
                      display: "flex",
                      width: 40,
                      height: 40,
                      flexShrink: 0,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 12,
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.12)",
                    }}
                  >
                    <img
                      src={prolayoutConfig.logo}
                      alt=""
                      width={28}
                      height={28}
                      style={{ borderRadius: 6 }}
                    />
                  </span>
                  {!collapsed && (
                    <span style={{ minWidth: 0 }}>
                      <span
                        style={{
                          display: "block",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          fontSize: 15,
                          fontWeight: 600,
                          letterSpacing: "-0.01em",
                          color: "#fff",
                        }}
                      >
                        React Router
                      </span>
                      <span
                        style={{
                          display: "block",
                          marginTop: 2,
                          fontSize: 13,
                          fontWeight: 500,
                          letterSpacing: "0.05em",
                          color: "rgba(255,255,255,0.6)",
                        }}
                      >
                        Antd Admin
                      </span>
                    </span>
                  )}
                </Link>
              </div>

              <div
                style={{
                  minHeight: 0,
                  flex: 1,
                  overflowX: "hidden",
                  overflowY: "auto",
                  paddingLeft: 8,
                  paddingRight: 8,
                  paddingTop: 12,
                  paddingBottom: 8,
                }}
                className="admin-shell-menu-scrollbar"
              >
                <Menu
                  theme="dark"
                  mode="inline"
                  selectedKeys={selectedKeys}
                  openKeys={openKeys}
                  onOpenChange={onOpenChange}
                  style={{ background: "transparent", border: "none" }}
                  style={{ borderInlineEnd: "none" }}
                  items={menuItems}
                />
              </div>

              <MenuFooterRender collapsed={collapsed} />
            </div>
          </Sider>

          <Layout
            style={{
              marginInlineStart: mainGutterStart,
              transition: "margin-inline-start 0.2s",
              display: "flex",
              height: "100dvh",
              minHeight: 0,
              minWidth: 0,
              flex: 1,
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <Header
              style={{
                paddingInline: 20,
                paddingBlock: 12,
                background: token.colorBgContainer,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                borderBottom: `1px solid ${token.colorBorderSecondary}`,
                zIndex: 20,
                flexShrink: 0,
              }}
            >
              <div style={{ minWidth: 0, flex: 1, overflowX: "auto", paddingRight: 8 }}>
                <Breadcrumb items={breadcrumbItems} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
                <Space size="middle">{actions}</Space>
                <AvatarDropDown user={user} />
              </div>
            </Header>

            <Content
              style={{
                margin: 0,
                padding: 0,
                minHeight: 0,
                minWidth: 0,
                flex: 1,
                overflowY: "auto",
              }}
            >
              <div
                style={{ display: "flex", flexDirection: "column", minHeight: "100%", minWidth: 0 }}
              >
                <Spin spinning={loading} style={{ minHeight: "100%", width: "100%" }}>
                  {children}
                </Spin>
              </div>
            </Content>

            <div style={{ flexShrink: 0 }}>
              <Footer />
            </div>
          </Layout>
        </Layout>
      </ConfigProvider>
    </Watermark>
  );
}
