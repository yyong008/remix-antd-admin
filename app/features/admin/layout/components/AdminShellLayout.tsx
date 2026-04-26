import { type AdminRouteNode } from "./admin-menu-helpers";
import type { ReactNode } from "react";

import { buildAdminMenuItems, getAdminShellMenuState } from "./admin-menu-helpers";
import { info } from "@/config/project";
import { Footer } from "@/components/common";
import { prolayoutConfig } from "@/config/prolayout";
import { MenuFooterRender } from "./MenuFooterRender";
import { createActionRenderWrap } from "./createActionsRender";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, href, useLocation, useParams, useMatches } from "react-router";
import { AvatarDropDown, type AdminHeaderUser } from "./AvatarDropdown";
import { Breadcrumb, Grid, Layout, Menu, Space, Spin, theme, Watermark } from "antd";

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

  const actions = useMemo(() => createActionRenderWrap()({ isMobile }), [isMobile]);

  const mainGutterStart = collapsed ? SIDER_COLLAPSED_PX : SIDER_EXPANDED_PX;

  return (
    <Watermark content={info.WaterMark}>
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
    </Watermark>
  );
}
