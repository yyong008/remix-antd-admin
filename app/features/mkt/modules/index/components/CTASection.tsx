import { Row, Col, Card, Typography, Button, Space, Avatar } from "antd";
import { RocketOutlined, BookOutlined, CheckCircleFilled } from "@ant-design/icons";
import { PRODUCT_NAME } from "~/config/product";
import { useState, useEffect } from "react";

const { Title, Paragraph } = Typography;

const trustBadges = [
  { text: "MIT 开源协议" },
  { text: "生产级代码" },
  { text: "活跃维护" },
  { text: "中文文档" },
];

const testimonials = [
  { name: "张", avatar: "/images/user.jpg" },
  { name: "李", avatar: "/images/user.jpg" },
  { name: "王", avatar: "/images/user.jpg" },
];

export function CTASection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section style={{ padding: "40px 24px 100px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Card
          style={{
            textAlign: "center",
            background: "linear-gradient(135deg, var(--mkt-accent) 0%, var(--mkt-accent-2) 100%)",
            borderRadius: "24px",
            border: "none",
            overflow: "hidden",
            position: "relative",
          }}
          bodyStyle={{ padding: "64px 24px" }}
        >
          {/* 背景装饰 */}
          <div
            style={{
              position: "absolute",
              top: "-50%",
              left: "-20%",
              width: "500px",
              height: "500px",
              background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)",
              borderRadius: "50%",
              pointerEvents: "none",
              animation: "pulse 4s ease-in-out infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-30%",
              right: "-10%",
              width: "400px",
              height: "400px",
              background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
              borderRadius: "50%",
              pointerEvents: "none",
              animation: "pulse 5s ease-in-out infinite 1s",
            }}
          />

          {/* 网格装饰 */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            {/* 顶部标签 */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 20px",
                background: "rgba(255,255,255,0.15)",
                borderRadius: "100px",
                marginBottom: "24px",
                color: "white",
                fontSize: "14px",
                fontWeight: 500,
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(-20px)",
                transition: "all 0.5s ease-out",
              }}
            >
              <CheckCircleFilled style={{ color: "#10B981" }} />
              已帮助 8,500+ 开发者快速启动项目
            </div>

            <Title
              level={2}
              style={{
                color: "white",
                marginBottom: "16px",
                fontSize: "40px",
                fontWeight: 700,
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.5s ease-out 0.1s",
              }}
            >
              立即开始你的项目
            </Title>
            <Paragraph
              style={{
                color: "rgba(255, 255, 255, 0.85)",
                marginBottom: "32px",
                fontSize: "18px",
                maxWidth: "560px",
                margin: "0 auto 32px",
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.5s ease-out 0.2s",
              }}
            >
              使用 {PRODUCT_NAME}，快速构建现代化的全栈应用
            </Paragraph>

            {/* CTA 按钮 */}
            <Space
              size="large"
              wrap
              style={{
                marginBottom: "40px",
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.5s ease-out 0.3s",
              }}
            >
              <Button
                type="primary"
                size="large"
                icon={<RocketOutlined />}
                href="https://github.com/yyong008/remix-antd-admin"
                target="_blank"
                className="cta-btn-primary"
                style={{
                  height: "56px",
                  padding: "0 40px",
                  fontSize: "16px",
                  fontWeight: 600,
                  borderRadius: "14px",
                  background: "var(--mkt-surface)",
                  borderColor: "var(--mkt-surface)",
                  color: "var(--mkt-accent)",
                  boxShadow: "0 12px 32px var(--mkt-shadow)",
                  transition: "all 0.3s ease",
                }}
              >
                开始使用
              </Button>
              <Button
                size="large"
                icon={<BookOutlined />}
                href="https://remix-antd-admin-docs.vercel.app/"
                target="_blank"
                className="cta-btn-secondary"
                style={{
                  height: "56px",
                  padding: "0 40px",
                  fontSize: "16px",
                  fontWeight: 600,
                  borderRadius: "14px",
                  background: "rgba(255, 255, 255, 0.1)",
                  borderColor: "rgba(255, 255, 255, 0.25)",
                  color: "white",
                  transition: "all 0.3s ease",
                }}
              >
                查看文档
              </Button>
            </Space>

            {/* 信任标志 */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "24px",
                flexWrap: "wrap",
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.5s ease-out 0.4s",
              }}
            >
              {/* 用户头像堆叠 */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    marginRight: "12px",
                  }}
                >
                  {testimonials.map((t, i) => (
                    <Avatar
                      key={i}
                      src={t.avatar}
                      size={32}
                      style={{
                        border: "2px solid white",
                        marginLeft: i > 0 ? "-10px" : 0,
                        zIndex: testimonials.length - i,
                      }}
                    />
                  ))}
                </div>
                <span style={{ color: "rgba(255,255,255,0.9)", fontSize: "14px" }}>50+ 贡献者</span>
              </div>

              <div
                style={{
                  width: "1px",
                  height: "24px",
                  background: "rgba(255,255,255,0.2)",
                }}
              />

              {/* 徽章列表 */}
              {trustBadges.map((badge, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "rgba(255,255,255,0.9)",
                    fontSize: "13px",
                  }}
                >
                  <CheckCircleFilled style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }} />
                  {badge.text}
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.02); }
        }
        .cta-btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.25) !important;
        }
        .cta-btn-secondary:hover {
          transform: translateY(-3px);
          background: rgba(255, 255, 255, 0.2) !important;
        }
      `}</style>
    </section>
  );
}
