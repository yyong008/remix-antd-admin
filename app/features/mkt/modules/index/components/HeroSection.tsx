import { Row, Col, Button, Typography } from "antd";
import { RocketOutlined, EyeOutlined, GithubOutlined } from "@ant-design/icons";
import { PRODUCT_NAME, PRODUCT_TAGLINE } from "~/config/product";
import { useEffect, useState } from "react";

const { Title, Paragraph } = Typography;

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sectionStyle: React.CSSProperties = {
    position: "relative",
    padding: "80px 24px 100px",
    maxWidth: "1200px",
    margin: "0 auto",
    overflow: "hidden",
  };

  const gradientTextStyle: React.CSSProperties = {
    background: "linear-gradient(135deg, var(--mkt-accent) 0%, var(--mkt-accent-2) 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };

  const badgeStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 16px",
    background: "var(--mkt-surface)",
    border: "1px solid var(--mkt-border)",
    borderRadius: "100px",
    marginBottom: "24px",
    fontSize: "14px",
    color: "var(--mkt-muted)",
    boxShadow: "0 4px 16px var(--mkt-shadow)",
    animation: mounted ? "floatBadge 3s ease-in-out infinite" : "none",
    opacity: mounted ? 1 : 0,
    transition: "opacity 0.3s ease",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "clamp(40px, 6vw, 64px)",
    fontWeight: 700,
    lineHeight: 1.1,
    marginBottom: "20px",
    color: "var(--mkt-text)",
    letterSpacing: "-0.02em",
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(20px)",
    transition: "all 0.6s ease-out 0.1s",
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: "18px",
    lineHeight: 1.7,
    color: "var(--mkt-muted)",
    marginBottom: "32px",
    maxWidth: "500px",
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(20px)",
    transition: "all 0.6s ease-out 0.2s",
  };

  const ctaContainerStyle: React.CSSProperties = {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap" as const,
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(20px)",
    transition: "all 0.6s ease-out 0.3s",
  };

  const trustStyle: React.CSSProperties = {
    display: "flex",
    gap: "32px",
    marginTop: "40px",
    paddingTop: "24px",
    borderTop: "1px solid var(--mkt-border)",
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(20px)",
    transition: "all 0.6s ease-out 0.4s",
  };

  const imageContainerStyle: React.CSSProperties = {
    position: "relative",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 32px 64px rgba(0, 0, 0, 0.12), 0 0 0 1px var(--mkt-border)",
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0) scale(1)" : "translateY(40px) scale(0.95)",
    transition: "all 0.8s ease-out 0.3s",
  };

  const browserTopStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 16px",
    background: "var(--mkt-surface)",
    borderBottom: "1px solid var(--mkt-border)",
  };

  const dotStyle = (color: string): React.CSSProperties => ({
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    background: color,
  });

  const addressBarStyle: React.CSSProperties = {
    flex: 1,
    height: "28px",
    marginLeft: "12px",
    background: "var(--mkt-bg)",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    paddingLeft: "12px",
    fontSize: "12px",
    color: "var(--mkt-muted)",
  };

  const techTagStyle: React.CSSProperties = {
    position: "absolute",
    top: "-16px",
    right: "-16px",
    padding: "12px 20px",
    background: "var(--mkt-surface)",
    borderRadius: "12px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    border: "1px solid var(--mkt-border)",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0) rotate(0deg)" : "translateY(-20px) rotate(5deg)",
    transition: "all 0.6s ease-out 0.5s",
  };

  return (
    <section style={sectionStyle}>
      {/* 背景装饰 */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(255, 107, 61, 0.15) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
          animation: "pulse 4s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-30%",
          left: "-5%",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(42, 109, 244, 0.12) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
          animation: "pulse 5s ease-in-out infinite 1s",
        }}
      />

      <Row gutter={[48, 48]} align="middle">
        <Col xs={24} lg={12}>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={badgeStyle}>
              <span
                style={{
                  fontSize: "18px",
                  animation: mounted ? "sparkle 2s ease-in-out infinite" : "none",
                }}
              >
                ⚡
              </span>
              <span>基于 React Router v7 构建</span>
            </div>

            <Title level={1} style={titleStyle}>
              {PRODUCT_NAME}
              <br />
              <span style={gradientTextStyle}>全栈开发范式</span>
            </Title>

            <Paragraph style={subtitleStyle}>
              {PRODUCT_TAGLINE ||
                `${PRODUCT_NAME} 是一个全栈解决方案，帮助你快速启动基于 React Router 的 AI 项目。集成了现代 Web 开发的最佳实践和工具链。`}
            </Paragraph>

            <div style={ctaContainerStyle}>
              <Button
                type="primary"
                size="large"
                icon={<RocketOutlined />}
                href="https://github.com/yyong008/remix-antd-admin"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-primary"
                style={{
                  height: "52px",
                  padding: "0 32px",
                  fontSize: "16px",
                  fontWeight: 600,
                  borderRadius: "12px",
                  background:
                    "linear-gradient(135deg, var(--mkt-accent) 0%, var(--mkt-accent-2) 100%)",
                  border: "none",
                  boxShadow: "0 8px 24px rgba(102, 126, 234, 0.35)",
                }}
              >
                开始使用
              </Button>
              <Button
                size="large"
                icon={<EyeOutlined />}
                href="https://remix-antd-admin-docs.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-secondary"
                style={{
                  height: "52px",
                  padding: "0 32px",
                  fontSize: "16px",
                  fontWeight: 600,
                  borderRadius: "12px",
                  border: "1px solid var(--mkt-border)",
                  color: "var(--mkt-text)",
                }}
              >
                查看演示
              </Button>
              <Button
                size="large"
                icon={<GithubOutlined />}
                href="https://github.com/yyong008/remix-antd-admin"
                target="_blank"
                rel="noopener noreferrer"
                ghost
                className="cta-ghost"
                style={{
                  height: "52px",
                  padding: "0 24px",
                  fontSize: "16px",
                  fontWeight: 600,
                  borderRadius: "12px",
                  border: "1px solid var(--mkt-border)",
                  color: "var(--mkt-text)",
                }}
              >
                GitHub
              </Button>
            </div>

            <div style={trustStyle}>
              <div>
                <div style={{ fontSize: "24px", fontWeight: 700, color: "var(--mkt-text)" }}>
                  50+
                </div>
                <div style={{ fontSize: "12px", color: "var(--mkt-muted)" }}>contributors</div>
              </div>
              <div>
                <div style={{ fontSize: "24px", fontWeight: 700, color: "var(--mkt-text)" }}>
                  v7
                </div>
                <div style={{ fontSize: "12px", color: "var(--mkt-muted)" }}>React Router</div>
              </div>
            </div>
          </div>
        </Col>

        <Col xs={24} lg={12}>
          <div style={imageContainerStyle}>
            <div style={browserTopStyle}>
              <div style={dotStyle("#ff5f57")} />
              <div style={dotStyle("#ffbd2e")} />
              <div style={dotStyle("#28ca42")} />
              <div style={addressBarStyle}>admin.remix-antd-admin.com</div>
            </div>
            <img
              src="/images/admin.png"
              alt={`${PRODUCT_NAME} Demo`}
              style={{ width: "100%", display: "block", background: "var(--mkt-bg)" }}
            />
          </div>

          <div style={techTagStyle}>
            <span style={{ fontSize: "20px" }}>🎨</span>
            <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--mkt-text)" }}>
              Ant Design 6
            </span>
          </div>
        </Col>
      </Row>

      <style>{`
        @keyframes floatBadge {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes sparkle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        .cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(102, 126, 234, 0.45) !important;
        }
        .cta-secondary:hover {
          transform: translateY(-2px);
          background: var(--mkt-surface) !important;
          border-color: var(--mkt-accent) !important;
          color: var(--mkt-accent) !important;
        }
        .cta-ghost:hover {
          transform: translateY(-2px);
          border-color: var(--mkt-accent-2) !important;
          color: var(--mkt-accent-2) !important;
        }
      `}</style>
    </section>
  );
}
