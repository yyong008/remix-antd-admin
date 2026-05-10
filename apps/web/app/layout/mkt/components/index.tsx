import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router";
import { config } from "~/config";
import { NavFooter } from "./footer";
import { defaultLang } from "~/config/lang";
import { IconRocket } from "@tabler/icons-react";
import { Button } from "@workspace/ui/components/button";
import { ThemeSwitcher } from "~/components/theme-switcher";
import { LocaleSwitcher } from "~/components/locale-switcher";


const navItems = [
  { key: "home", label: "Home", href: "" },
  { key: "news", label: "News", href: "news" },
  { key: "blog", label: "Blog", href: "blog" },
  { key: "about", label: "About", href: "about" },
];

export function MarketingsLayout() {
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
      <header className="sticky top-0 z-50 flex items-center justify-between max-w-5xl mx-auto px-6 w-full h-16 border-b border-border bg-background/80 backdrop-blur-sm">
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
            <span className="text-xs text-muted-foreground">
              React Router
            </span>
            <p className="text-lg font-semibold m-0">Antd Admin</p>
          </div>
        </button>

        <nav className="flex items-center gap-6">
          {navItems.map((item) => {
            const hrefPath = item.href
              ? `/${locale}/${item.href}`
              : `/${locale}`;
            const isActive = isNavActive(item.href);
            return (
              <NavLink
                key={item.key}
                to={hrefPath}
                className={`relative text-sm font-medium py-2 transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
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
              Login Admin
            </Button>
          </Link>
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
