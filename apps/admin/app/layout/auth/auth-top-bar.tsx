import { Link, useParams } from "react-router";
import { LocaleSwitcher, ThemeSwitcher } from "~/components/common";
import { defaultLang } from "~/config/lang";
import { PRODUCT_NAME } from "~/config/product";

export function AuthTopBar() {
  const { locale: localeParam } = useParams();
  const locale = localeParam ?? defaultLang;
  const homeHref = locale ? `/${locale}` : "/";

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        display: "flex",
        height: 56,
        flexShrink: 0,
        alignItems: "center",
        justifyContent: "space-between",
        paddingInline: 20,
        borderBottom: "1px solid var(--ant-color-border-secondary)",
        backdropFilter: "blur(12px)",
        background: "color-mix(in srgb, var(--ant-color-bg-container) 80%, transparent)",
      }}
    >
      <Link
        to={homeHref}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <img alt="Logo" src="/logo.png" style={{ height: 28, width: 28, borderRadius: 6 }} />
        <span style={{ fontSize: 15, fontWeight: 600 }}>{PRODUCT_NAME}</span>
      </Link>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <LocaleSwitcher />
        <ThemeSwitcher />
      </div>
    </header>
  );
}
