import { useState } from "react";
import { Card, Typography } from "antd";
import {
  RocketOutlined,
  ApiOutlined,
  DatabaseOutlined,
  RobotOutlined,
  CodeOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import styles from "./FeaturesSection.module.css";

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
    color: "#6366f1",
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
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Title level={2} className={styles.title}>
            核心能力
          </Title>
          <Paragraph className={styles.desc}>
            基于现代 Web 技术栈与开箱能力，快速落地全栈 AI 与管理后台场景。
          </Paragraph>
        </div>

        <div className={styles.grid}>
          {features.map((feature, index) => (
            <div
              key={index}
              className={styles.cardWrapper}
              style={{
                background:
                  hoveredIndex === index
                    ? `linear-gradient(135deg, ${feature.color}60 0%, ${feature.color}20 100%)`
                    : "transparent",
                boxShadow:
                  hoveredIndex === index
                    ? `0 20px 40px color-mix(in srgb, ${feature.color} 25%, transparent), 0 0 0 1px color-mix(in srgb, ${feature.color} 40%, transparent)`
                    : "none",
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Card
                hoverable={false}
                className={styles.card}
                style={{
                  border: `1px solid color-mix(in srgb, ${feature.color} 30%, transparent)`,
                }}
                styles={{ body: { padding: "28px" } }}
              >
                <div
                  className={styles.iconBox}
                  style={{
                    background: `linear-gradient(135deg, ${feature.color} 0%, color-mix(in srgb, ${feature.color} 80%, transparent) 100%)`,
                    boxShadow:
                      hoveredIndex === index
                        ? `0 8px 32px color-mix(in srgb, ${feature.color} 60%, transparent), 0 0 48px color-mix(in srgb, ${feature.color} 30%, transparent)`
                        : `0 8px 24px color-mix(in srgb, ${feature.color} 40%, transparent)`,
                    transform: hoveredIndex === index ? "scale(1.1)" : "scale(1)",
                  }}
                >
                  {feature.icon}
                </div>

                <Title
                  level={4}
                  className={styles.featureTitle}
                  style={{
                    color: hoveredIndex === index ? feature.color : undefined,
                  }}
                >
                  {feature.title}
                </Title>

                <Paragraph className={styles.featureDesc}>{feature.description}</Paragraph>

                <div
                  className={styles.bottomLine}
                  style={{
                    background: `linear-gradient(90deg, transparent, color-mix(in srgb, ${feature.color} 60%, transparent), transparent)`,
                    opacity: hoveredIndex === index ? 1 : 0,
                  }}
                />
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
