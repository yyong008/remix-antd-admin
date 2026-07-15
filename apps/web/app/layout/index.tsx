import { Link, NavLink, Outlet, useLocation, useNavigate, useParams } from "react-router";
import { AppQueryProvider } from "~/providers/app-query-provider";
import { config } from "~/config";
import { NavFooter } from "./components/footer";
import { defaultLang } from "~/config/lang";
import { IconRocket } from "@tabler/icons-react";
import { Button } from "@workspace/ui/components/button";
import { ThemeSwitcher } from "~/components/theme-switcher";
import { LocaleSwitcher } from "~/components/locale-switcher";
import * as m from "~/paraglide/messages.js";

type NavKey = "home" | "news" | "blog" | "about" | "docs" | "privacy";

const navItems: Array<{ key: NavKey; href: string }> = [
  { key: "home", href: "" },
  { key: "news", href: "news" },
  { key: "blog", href: "blog" },
  { key: "docs", href: "docs" },
  { key: "about", href: "about" },
  { key: "privacy", href: "privacy" },
];

function navLabel(key: NavKey) {
  switch (key) {
    case "home":
      return m.nav_home();
    case "news":
      return m.nav_news();
    case "blog":
      return m.nav_blog();
    case "docs":
      return m.nav_docs();
    case "about":
      return m.nav_about();
    case "privacy":
      return m.nav_privacy();
  }
}

function MarketingLayout() {
  const { locale: localeParam } = useParams();
  const locale = localeParam ?? defaultLang;
  const location = useLocation();
  const navigate = useNavigate();
  const activePath = location.pathname;

  const isNavActive = (itemHref: string) => {
    if (itemHref === "") {
      return activePath === `/${locale}` || activePath === "/";
    }
    return activePath.startsWith(`/${locale}/${itemHref}`);
  };

  return (
    <div className="relative min-h-screen max-w-full overflow-x-hidden">
      <header className="sticky top-0 z-50   px-6 w-full  border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between h-16">
          <button
            type="button"
            className="flex items-center gap-3 cursor-pointer text-foreground"
            onClick={() => navigate(`/`)}
            aria-label="Go to home"
          >
            <span className="flex items-center justify-center w-9 h-9 text-lg text-primary">
              <IconRocket className="size-5" />
            </span>
            <div className="flex flex-col leading-tight">
              <span className="text-xs text-muted-foreground">{m.nav_brand_subtitle()}</span>
              <p className="text-lg font-semibold m-0">{m.nav_brand_title()}</p>
            </div>
          </button>

          <nav className="flex items-center gap-6">
            {navItems.map((item) => {
              const hrefPath = item.href ? `/${locale}/${item.href}` : `/${locale}`;
              const isActive = isNavActive(item.href);
              return (
                <NavLink
                  key={item.key}
                  to={hrefPath}
                  className={`relative text-sm font-medium py-2 transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {navLabel(item.key)}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-sm" />
                  )}
                </NavLink>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <LocaleSwitcher />
            <ThemeSwitcher />
            <Link to={config.admin.url} target="_blank">
              <Button variant="default" size="lg">
                {m.nav_login_admin()}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="bg-card border-t border-border px-6 py-12 max-w-full overflow-x-hidden">
        <NavFooter />
      </footer>
    </div>
  );
}

export default function Layout() {
  return (
    <AppQueryProvider>
      <MarketingLayout />
    </AppQueryProvider>
  );
}
