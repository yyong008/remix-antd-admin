import type { SessionUserContextType } from "~/session/context";

import type { MenuProps } from "antd";
import { Avatar, Button, Dropdown, Layout } from "antd";
import { href, NavLink, Outlet, useLocation, useNavigate, useParams } from "react-router";
import { useLogout } from "~/api-client/queries/auth";
import { defaultLang } from "~/config/lang";

import { useSession } from "~/session/provider";
import { NavFooter } from "./footer";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { DashboardOutlined, LogoutOutlined, RocketOutlined } from "@ant-design/icons";
import styles from "./Nav.module.css";

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

  const sessionPending = sessionCtx?.isLoading ?? false;
  const logoutMutation = useLogout();

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

  // Check if a nav item is active
  const isNavActive = (itemHref: string) => {
    if (itemHref === "") {
      return activePath === `/${locale}` || activePath === "/";
    }
    return activePath.startsWith(`/${locale}/${itemHref}`);
  };

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        {/* Brand */}
        <button
          type="button"
          className={styles.brand}
          onClick={() => navigate(`/${locale}`)}
          aria-label="Go to home"
        >
          <span className={styles.brandIcon}>
            <RocketOutlined />
          </span>
          <div className={styles.brandText}>
            <span className={styles.brandTitle}>React Router</span>
            <p className={styles.brandName}>Antd Admin</p>
          </div>
        </button>

        {/* Nav Links */}
        <nav className={styles.nav}>
          {navItems.map((item) => {
            const hrefPath = item.href ? `/${locale}/${item.href}` : `/${locale}`;
            const isActive = isNavActive(item.href);
            return (
              <NavLink
                key={item.key}
                to={hrefPath}
                className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
              >
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Actions */}
        <div className={styles.actions}>
          <LanguageSwitcher />
          <ThemeSwitcher />
          {sessionPending ? (
            <div className={styles.avatarSkeleton} />
          ) : user ? (
            <Dropdown
              menu={accountMenu}
              trigger={["click"]}
              placement="bottomRight"
              popupRender={(menu) => (
                <div className={styles.userPopup}>
                  <div className={styles.userInfo}>
                    <Avatar src={avatarUrl} size={48} style={{ flexShrink: 0 }}>
                      {avatarLetter}
                    </Avatar>
                    <div className={styles.userDetails}>
                      <div className={styles.userName}>{displayName}</div>
                      {user.email ? <div className={styles.userEmail}>{user.email}</div> : null}
                    </div>
                  </div>
                  <div className={styles.menuDivider} />
                  <div>{menu}</div>
                </div>
              )}
            >
              <button
                type="button"
                className={styles.avatarBtn}
                aria-label={displayName}
                title={displayName}
              >
                <Avatar src={avatarUrl} size={36}>
                  {avatarLetter}
                </Avatar>
              </button>
            </Dropdown>
          ) : (
            <Button
              type="primary"
              onClick={() => navigate(href("/:locale?/auth/login", { locale }))}
            >
              Log in
            </Button>
          )}
        </div>
      </Header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <Footer className={styles.footer}>
        <NavFooter />
      </Footer>
    </Layout>
  );
}
