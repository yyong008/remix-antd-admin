import { Row, Col, Card, Typography, Steps } from "antd";
import { CloudUploadOutlined, SettingOutlined, RocketOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const { Title, Paragraph } = Typography;

const steps = [
  {
    icon: <CloudUploadOutlined />,
    title: "克隆项目模板",
    description: "使用 Git 克隆或使用 CLI 工具创建新项目",
    colorVar: "--mkt-accent",
  },
  {
    icon: <SettingOutlined />,
    title: "配置环境变量",
    description: "复制 .env.example 并配置必要的 API 密钥和数据库连接",
    colorVar: "--mkt-accent-2",
  },
  {
    icon: <RocketOutlined />,
    title: "启动开发服务器",
    description: "运行 pnpm dev 开始开发，访问 http://localhost:5173",
    colorVar: "--mkt-accent",
  },
];

function getStepColor(colorVar: string, alpha = "") {
  return `color-mix(in srgb, var(${colorVar}) 100%, transparent ${alpha ? alpha + "%" : "0%"})`;
}

export function HowItWorks() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section style={{ padding: "60px 24px 80px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <Title level={2} style={{ marginBottom: "12px" }}>
            快速上手
          </Title>
          <Paragraph type="secondary" style={{ maxWidth: "600px", margin: "0 auto" }}>
            三步启动你的下一个全栈项目
          </Paragraph>
        </div>

        <Row gutter={[32, 32]} justify="center">
          {steps.map((step, index) => (
            <Col key={index} xs={24} sm={12} lg={8}>
              <div
                style={{
                  position: "relative",
                  height: "100%",
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0)" : "translateY(30px)",
                  transition: `all 0.5s ease-out ${index * 0.15}s`,
                }}
              >
                {/* 连接线 */}
                {index < steps.length - 1 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "40px",
                      right: "-16px",
                      width: "32px",
                      height: "2px",
                      background: "linear-gradient(90deg, var(--mkt-border), transparent)",
                      zIndex: 1,
                    }}
                  />
                )}

                <Card
                  hoverable
                  style={{
                    height: "100%",
                    borderRadius: "16px",
                    border: "1px solid var(--mkt-border)",
                    transition: "all 0.3s ease",
                  }}
                  bodyStyle={{ padding: "32px", textAlign: "center" }}
                >
                  {/* 步骤编号 */}
                  <div
                    style={{
                      position: "absolute",
                      top: "-14px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, var(${step.colorVar}) 0%, color-mix(in srgb, var(${step.colorVar}) 70%, transparent) 100%)`,
                      color: "white",
                      fontSize: "14px",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: `0 4px 12px var(--mkt-shadow)`,
                    }}
                  >
                    {index + 1}
                  </div>

                  {/* 图标 */}
                  <div
                    style={{
                      width: "72px",
                      height: "72px",
                      borderRadius: "16px",
                      background: `color-mix(in srgb, var(${step.colorVar}) 10%, transparent)`,
                      border: `1px solid color-mix(in srgb, var(${step.colorVar}) 30%, transparent)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                      fontSize: "32px",
                      color: `var(${step.colorVar})`,
                    }}
                  >
                    {step.icon}
                  </div>

                  <Title level={4} style={{ marginBottom: "8px" }}>
                    {step.title}
                  </Title>
                  <Paragraph
                    type="secondary"
                    style={{ margin: 0, fontSize: "14px", lineHeight: 1.6 }}
                  >
                    {step.description}
                  </Paragraph>
                </Card>
              </div>
            </Col>
          ))}
        </Row>

        {/* 代码块 */}
        <div
          style={{
            marginTop: "48px",
            padding: "24px 32px",
            background: "var(--mkt-surface)",
            borderRadius: "12px",
            border: "1px solid var(--mkt-border)",
            maxWidth: "600px",
            margin: "48px auto 0",
            fontFamily: "monospace",
            fontSize: "14px",
            color: "var(--mkt-muted)",
          }}
        >
          <div style={{ marginBottom: "8px", color: "var(--mkt-text)", fontWeight: 500 }}>
            # 克隆项目
          </div>
          <div style={{ marginBottom: "16px" }}>
            git clone https://github.com/yyong008/remix-antd-admin.git
          </div>
          <div style={{ marginBottom: "8px", color: "var(--mkt-text)", fontWeight: 500 }}>
            # 安装依赖
          </div>
          <div style={{ marginBottom: "16px" }}>pnpm install</div>
          <div style={{ marginBottom: "8px", color: "var(--mkt-text)", fontWeight: 500 }}>
            # 启动开发
          </div>
          <div>pnpm dev</div>
        </div>
      </div>
    </section>
  );
}
