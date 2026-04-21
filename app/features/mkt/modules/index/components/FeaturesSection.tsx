import { useState } from "react";
import { Row, Col, Card, Typography } from "antd";
import {
  RocketOutlined,
  ApiOutlined,
  DatabaseOutlined,
  RobotOutlined,
  CodeOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const features: Feature[] = [
  {
    icon: <RocketOutlined />,
    title: "React Router Hono 内置支持",
    description: "基于 Remix + Hono 路由快速开发项目",
    color: "var(--mkt-accent)",
  },
  {
    icon: <ApiOutlined />,
    title: "Ant Design 组件支持",
    description: "基于 Ant Design 组件库开发项目",
    color: "#1890FF",
  },
  {
    icon: <RobotOutlined />,
    title: "AI SDK 内置支持",
    description: "基于 AI SDK 的 AI 能力开发项目",
    color: "#10B981",
  },
  {
    icon: <DatabaseOutlined />,
    title: "Drizzle 内置支持",
    description: "基于 Drizzle ORM 的数据库开发项目",
    color: "#0EA5E9",
  },
  {
    icon: <ThunderboltOutlined />,
    title: "高性能优化",
    description: "内置性能优化和最佳实践",
    color: "#F59E0B",
  },
  {
    icon: <CodeOutlined />,
    title: "原生 CSS 样式支持",
    description: "基于原生 CSS 的样式开发，完美支持暗色模式",
    color: "#06B6D4",
  },
];

export function FeaturesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section style={{ padding: "40px 24px 80px", background: "var(--mkt-bg)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <Title level={2} style={{ marginBottom: "12px", color: "var(--mkt-text)" }}>
            核心能力
          </Title>
          <Paragraph style={{ maxWidth: "600px", margin: "0 auto", color: "var(--mkt-muted)" }}>
            基于现代 Web 技术栈与开箱能力，快速落地全栈 AI 与管理后台场景。
          </Paragraph>
        </div>

        <Row gutter={[20, 20]}>
          {features.map((feature, index) => (
            <Col key={index} xs={24} sm={12} lg={8}>
              <div
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  height: "100%",
                  borderRadius: "16px",
                  padding: "1px",
                  background:
                    hoveredIndex === index
                      ? `linear-gradient(135deg, ${feature.color}60 0%, ${feature.color}20 100%)`
                      : "transparent",
                  transition: "all 0.4s ease",
                  transform: hoveredIndex === index ? "translateY(-4px)" : "translateY(0)",
                  boxShadow:
                    hoveredIndex === index
                      ? `0 20px 40px color-mix(in srgb, ${feature.color} 25%, transparent), 0 0 0 1px color-mix(in srgb, ${feature.color} 40%, transparent)`
                      : "none",
                }}
              >
                <Card
                  hoverable={false}
                  style={{
                    height: "100%",
                    position: "relative",
                    background: `radial-gradient(circle at top right, color-mix(in srgb, ${feature.color} 15%, transparent), transparent 60%), var(--mkt-surface)`,
                    border: `1px solid color-mix(in srgb, ${feature.color} 30%, transparent)`,
                    borderRadius: "15px",
                    transition: "all 0.3s ease",
                  }}
                  bodyStyle={{ padding: "28px" }}
                >
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "14px",
                      background: `linear-gradient(135deg, ${feature.color} 0%, color-mix(in srgb, ${feature.color} 80%, transparent) 100%)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "26px",
                      color: "white",
                      marginBottom: "20px",
                      boxShadow:
                        hoveredIndex === index
                          ? `0 8px 32px color-mix(in srgb, ${feature.color} 60%, transparent), 0 0 48px color-mix(in srgb, ${feature.color} 30%, transparent)`
                          : `0 8px 24px color-mix(in srgb, ${feature.color} 40%, transparent)`,
                      transform: hoveredIndex === index ? "scale(1.1)" : "scale(1)",
                      transition: "all 0.4s ease",
                    }}
                  >
                    {feature.icon}
                  </div>

                  <Title
                    level={4}
                    style={{
                      marginBottom: "8px",
                      fontWeight: 600,
                      transition: "color 0.3s ease",
                      color: hoveredIndex === index ? feature.color : "var(--mkt-text)",
                    }}
                  >
                    {feature.title}
                  </Title>

                  <Paragraph
                    style={{
                      margin: 0,
                      fontSize: "14px",
                      lineHeight: 1.6,
                      color: "var(--mkt-muted)",
                    }}
                  >
                    {feature.description}
                  </Paragraph>

                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: "28px",
                      right: "28px",
                      height: "2px",
                      background: `linear-gradient(90deg, transparent, color-mix(in srgb, ${feature.color} 60%, transparent), transparent)`,
                      opacity: hoveredIndex === index ? 1 : 0,
                      transition: "opacity 0.4s ease",
                    }}
                  />
                </Card>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}
