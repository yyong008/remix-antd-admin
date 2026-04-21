import type { MenuProps } from "antd";
import { Avatar, Dropdown, Layout, Space, theme } from "antd";
import { href, NavLink, Outlet, useLocation, useNavigate, useParams } from "react-router";
import { useLogout } from "~/api-client/queries/auth";
import { defaultLang } from "~/config/lang";
import type { SessionUserContextType } from "~/session/context";
import { useSession } from "~/session/hooks";
import { NavFooter } from "./footer";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { DashboardOutlined, LogoutOutlined, RocketOutlined } from "@ant-design/icons";

const { Header, Footer } = Layout;

type SessionUser = NonNullable<SessionUserContextType["user"]>;

function pickAvatarUrl(u: SessionUser): string | undefined {
  const extended = u as SessionUser & { avatar?: string | null };
  const raw = extended.avatar?.trim() || u.image?.trim();
  return raw || undefined;
}

function pickDisplayName(u: SessionUser): string {
  const extended = u as SessionUser & { nickname?: string | null };
  const n = extended.nickname?.trim() || u.name?.trim() || u.email?.trim() || "User";
  return n;
}

const navItems = [
  { key: "home", label: "Home", href: "" },
  { key: "news", label: "News", href: "news" },
  { key: "blog", label: "Blog", href: "blog" },
  { key: "about", label: "About", href: "about" },
];

export function Nav() {
  const { locale: localeParam } = useParams();
  const locale = localeParam ?? defaultLang;
  const location = useLocation();
  const navigate = useNavigate();
  const activePath = location.pathname;
  const sessionCtx = useSession();
  const user = sessionCtx?.user ?? null;
  const sessionPending = sessionCtx?.isSessionPending ?? false;
  const logoutMutation = useLogout();

  const { token } = theme.useToken();
  const accountMenu: MenuProps = {
    items: [
      {
        key: "dashboard",
        icon: <DashboardOutlined />,
        label: "Dashboard",
        onClick: () => navigate(href("/:locale?/admin/dashboard", { locale })),
      },
      { type: "divider" },
      {
        key: "logout",
        icon: <LogoutOutlined />,
        danger: true,
        label: logoutMutation.isPending ? "Signing out…" : "Sign out",
        disabled: logoutMutation.isPending,
        onClick: () => {
          void logoutMutation.mutateAsync();
        },
      },
    ],
  };

  const avatarUrl = user ? pickAvatarUrl(user) : undefined;
  const displayName = user ? pickDisplayName(user) : "";
  const avatarLetter = displayName.slice(0, 1).toUpperCase();

  const getNavLinkClassName = (isActive: boolean) => {
    return isActive
      ? "text-sm font-semibold tracking-wide text-(--mkt-text) no-underline"
      : "text-sm font-semibold tracking-wide text-(--mkt-muted) transition-colors hover:text-(--mkt-text) no-underline";
  };

  const getMobileNavLinkClassName = (isActive: boolean) => {
    return isActive
      ? "whitespace-nowrap rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] transition border-(--mkt-text) bg-(--mkt-text) text-(--mkt-surface)"
      : "whitespace-nowrap rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] transition border-(--mkt-border) text-(--mkt-muted)";
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "var(--mkt-bg)" }}>
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          overflow: "hidden",
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "40px",
            left: "-128px",
            width: "288px",
            height: "288px",
            borderRadius: "50%",
            background: "var(--mkt-accent)",
            opacity: 0.2,
            filter: "blur(110px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "192px",
            right: "-120px",
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            background: "var(--mkt-accent-2)",
            opacity: 0.2,
            filter: "blur(120px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-200px",
            left: "25%",
            width: "384px",
            height: "384px",
            borderRadius: "50%",
            background: "#f4b860",
            opacity: 0.2,
            filter: "blur(140px)",
          }}
        />
      </div>

      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 30,
          borderBottom: "1px solid var(--mkt-border)",
          background: "var(--mkt-bg)",
          backdropFilter: "blur(8px)",
          padding: "0 24px",
          height: "auto",
          lineHeight: "normal",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 0",
          }}
        >
          <button
            type="button"
            onClick={() => navigate(`/${locale}`)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              background: "none",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                borderRadius: "16px",
                background: "var(--mkt-text)",
                fontSize: "18px",
                fontWeight: "bold",
                color: "var(--mkt-surface)",
              }}
            >
              <RocketOutlined />
            </span>
            <div style={{ lineHeight: 1.2 }}>
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--mkt-muted)",
                  margin: 0,
                }}
              >
                Remix
              </p>
              <p style={{ fontSize: "18px", fontWeight: 600, color: "var(--mkt-text)", margin: 0 }}>
                Antd Admin
              </p>
            </div>
          </button>

          <nav style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            {navItems.map((item) => {
              const hrefPath = item.href ? `/${locale}/${item.href}` : `/${locale}`;
              const isActive = item.href
                ? activePath === hrefPath || activePath.startsWith(`${hrefPath}/`)
                : activePath === "/" || activePath === `/${locale}` || activePath === `/${locale}/`;
              return (
                <NavLink key={item.key} to={hrefPath} className={getNavLinkClassName(isActive)}>
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          <Space size="middle">
            <LanguageSwitcher />
            <ThemeSwitcher />
            {sessionPending ? (
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "var(--mkt-border)",
                }}
              />
            ) : user ? (
              <Dropdown
                menu={accountMenu}
                trigger={["click"]}
                placement="bottomRight"
                popupRender={(menu) => (
                  <div
                    style={{
                      minWidth: 260,
                      overflow: "hidden",
                      borderRadius: 12,
                      border: `1px solid ${token.colorBorder}`,
                      background: token.colorBgElevated,
                      boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: 12,
                        padding: "12px 16px",
                        borderBottom: `1px solid ${token.colorBorder}`,
                      }}
                    >
                      <Avatar src={avatarUrl} size={48} style={{ flexShrink: 0 }}>
                        {avatarLetter}
                      </Avatar>
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            fontSize: 15,
                            fontWeight: 600,
                            lineHeight: 1.4,
                            color: token.colorText,
                          }}
                        >
                          {displayName}
                        </div>
                        {user.email ? (
                          <div
                            style={{
                              marginTop: 2,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              fontSize: 12,
                              lineHeight: 1.4,
                              color: token.colorTextSecondary,
                            }}
                          >
                            {user.email}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div style={{ padding: "8px 0" }}>{menu}</div>
                  </div>
                )}
              >
                <button
                  type="button"
                  aria-label={displayName}
                  title={displayName}
                  style={{
                    display: "flex",
                    borderRadius: "50%",
                    border: `1px solid ${token.colorBorder}`,
                    background: token.colorBgElevated,
                    padding: "2px",
                    cursor: "pointer",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                >
                  <Avatar src={avatarUrl} size={36}>
                    {avatarLetter}
                  </Avatar>
                </button>
              </Dropdown>
            ) : (
              <button
                type="button"
                onClick={() => navigate(href("/:locale?/auth/login", { locale }))}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  borderRadius: "9999px",
                  border: "1px solid var(--mkt-border)",
                  background: "var(--mkt-text)",
                  padding: "8px 16px",
                  fontSize: "12px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--mkt-surface)",
                  cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
              >
                Log in
              </button>
            )}
          </Space>
        </div>
      </Header>

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      <Footer
        style={{
          borderTop: "1px solid var(--mkt-border)",
          padding: 0,
          background: "var(--mkt-bg)",
        }}
      >
        <NavFooter />
      </Footer>
    </Layout>
  );
}
