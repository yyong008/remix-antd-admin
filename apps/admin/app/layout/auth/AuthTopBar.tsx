import { Link, href, useParams } from "react-router";
import { defaultLang } from "~/config/lang";
import { AUTH_PRODUCT_NAME } from "./AuthMarketingShell";

export function AuthTopBar() {
  const { locale: localeParam } = useParams();
  const locale = localeParam ?? defaultLang;

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
        paddingInline: 16,
        backdropFilter: "blur(12px)",
      }}
    >
      <Link
        to={href("/:locale?", { locale })}
        style={{
          display: "flex",
          maxWidth: "100%",
          alignItems: "center",
          gap: 12,
          borderRadius: 8,
          paddingBlock: 4,
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <img
          alt="Logo"
          src="/logo.png"
          style={{
            height: 32,
            width: 32,
            flexShrink: 0,
            borderRadius: 8,
            boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
          }}
        />
        <span
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: "-0.02em",
          }}
        >
          {AUTH_PRODUCT_NAME}
        </span>
      </Link>
    </header>
  );
}