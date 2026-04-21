import { CheckCircleFilled } from "@ant-design/icons";
import { Flex, Grid, Typography } from "antd";
import type { ReactNode } from "react";
import { PRODUCT_NAME } from "~/config/product";

/** Shown in auth marketing chrome and footers */
export const AUTH_PRODUCT_NAME = PRODUCT_NAME;

type Variant = "login" | "signup";

const COPY: Record<
  Variant,
  { eyebrow: string; headline: string; subline: string; bullets: string[] }
> = {
  login: {
    eyebrow: "Welcome back",
    headline: "Operate your workspace with confidence",
    subline:
      "A production-ready admin shell with auth, RBAC, and monitoring—built for teams that care about clarity and control.",
    bullets: [
      "Single sign-on ready flows with captcha-backed protection",
      "Role-aware navigation and audited administrative actions",
      "Responsive layout tuned for operators and reviewers alike",
    ],
  },
  signup: {
    eyebrow: "Create your workspace",
    headline: "Onboard in minutes, scale with your product",
    subline:
      "Provision accounts with the same guardrails as enterprise deployments—without slowing down your first deploy.",
    bullets: [
      "Email-based identity with hardened password policies",
      "Captcha verification to reduce automated abuse",
      "Seamless hand-off to the admin console after activation",
    ],
  },
};

function LogoMark() {
  return (
    <img
      alt="Logo"
      src="/logo.png"
      style={{
        height: 44,
        width: 44,
        flexShrink: 0,
        borderRadius: 16,
        boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
        border: "1px solid var(--mkt-border)",
      }}
    />
  );
}

export function AuthMarketingShell({
  variant,
  children,
}: {
  variant: Variant;
  children: ReactNode;
}) {
  const copy = COPY[variant];
  const screens = Grid.useBreakpoint();
  const lg = !!screens.lg;

  return (
    <Flex
      vertical
      style={{
        position: "relative",
        minHeight: 0,
        width: "100%",
        flex: 1,
        overflowX: "hidden",
        overflowY: "auto",
        background: "var(--mkt-bg)",
        color: "var(--mkt-text)",
      }}
    >
      <div
        aria-hidden
        style={{
          pointerEvents: "none",
          position: "absolute",
          left: -112,
          top: 24,
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "var(--mkt-accent)",
          opacity: 0.22,
          filter: "blur(120px)",
        }}
      />
      <div
        aria-hidden
        style={{
          pointerEvents: "none",
          position: "absolute",
          right: -128,
          bottom: 0,
          width: 384,
          height: 384,
          borderRadius: "50%",
          background: "var(--mkt-accent-2)",
          opacity: 0.2,
          filter: "blur(130px)",
        }}
      />
      <div
        aria-hidden
        style={{
          pointerEvents: "none",
          position: "absolute",
          left: "33%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: 256,
          height: 256,
          borderRadius: "50%",
          background: "color-mix(in srgb, var(--mkt-accent) 32%, transparent)",
          opacity: 0.3,
          filter: "blur(90px)",
        }}
      />

      <Flex
        style={{
          position: "relative",
          zIndex: 1,
          margin: "0 auto",
          minHeight: "100%",
          width: "100%",
          maxWidth: 1180,
          flex: 1,
          flexDirection: lg ? "row" : "column",
          alignItems: lg ? "stretch" : undefined,
          gap: lg ? 8 : 0,
          paddingLeft: lg ? 40 : 0,
          paddingRight: lg ? 40 : 0,
        }}
      >
        <aside
          style={{
            display: lg ? "flex" : "none",
            position: "relative",
            width: "100%",
            maxWidth: "none",
            flex: "1.05 1 0%",
            flexDirection: "column",
            justifyContent: "center",
            gap: 40,
            borderColor: "var(--mkt-border)",
            padding: lg ? "80px 24px" : "64px 32px",
            borderRight: lg ? "1px solid var(--mkt-border)" : undefined,
          }}
        >
          <div
            aria-hidden
            style={{
              display: lg ? "block" : "none",
              position: "absolute",
              top: 40,
              bottom: 40,
              right: 0,
              width: 1,
              background: `linear-gradient(to bottom, transparent, var(--mkt-border), transparent)`,
            }}
          />
          <Flex align="flex-start" gap={16}>
            <LogoMark />
            <div>
              <Typography.Paragraph
                style={{
                  marginBottom: 4,
                  fontSize: 12,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  color: "var(--mkt-muted)",
                }}
              >
                {copy.eyebrow}
              </Typography.Paragraph>
              <Typography.Title
                level={1}
                style={{
                  margin: 0,
                  color: "var(--mkt-text)",
                  fontSize: lg ? "2rem" : "1.875rem",
                  lineHeight: 1.2,
                  fontWeight: 600,
                }}
              >
                {copy.headline}
              </Typography.Title>
              <Typography.Paragraph
                style={{
                  marginTop: 16,
                  maxWidth: 448,
                  fontSize: 14,
                  lineHeight: 1.625,
                  color: "var(--mkt-muted)",
                  marginBottom: 0,
                }}
              >
                {copy.subline}
              </Typography.Paragraph>
            </div>
          </Flex>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              maxWidth: 512,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {copy.bullets.map((line) => (
              <li key={line} style={{ display: "flex", gap: 12, fontSize: 14, lineHeight: 1.625 }}>
                <CheckCircleFilled
                  style={{
                    marginTop: 2,
                    flexShrink: 0,
                    color: "var(--mkt-accent)",
                  }}
                />
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <Typography.Text style={{ fontSize: 12, color: "var(--mkt-muted)" }}>
            © {new Date().getFullYear()} {AUTH_PRODUCT_NAME}
          </Typography.Text>
        </aside>

        <Flex
          vertical
          justify="center"
          style={{
            flex: 1,
            padding: lg ? "80px 16px" : "48px 20px",
            minWidth: lg ? 0 : undefined,
            maxWidth: lg ? 520 : undefined,
            flexShrink: lg ? 0 : undefined,
          }}
        >
          <Flex align="center" gap={12} style={{ marginBottom: 32, display: lg ? "none" : "flex" }}>
            <LogoMark />
            <div>
              <Typography.Text
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: "var(--mkt-muted)",
                }}
              >
                {AUTH_PRODUCT_NAME}
              </Typography.Text>
              <Typography.Text
                strong
                style={{ display: "block", fontSize: 14, color: "var(--mkt-text)" }}
              >
                {copy.eyebrow}
              </Typography.Text>
            </div>
          </Flex>
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
}
