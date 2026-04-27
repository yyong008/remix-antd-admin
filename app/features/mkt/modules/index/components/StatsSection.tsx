import { useEffect, useState } from "react";
import { Row, Col, Typography } from "antd";
import { UserOutlined, FileTextOutlined, ApiOutlined } from "@ant-design/icons";
import styles from "./StatsSection.module.css";

const { Title, Text } = Typography;

interface StatItem {
  label: string;
  value: number;
  suffix: string;
  icon: React.ReactNode;
  color: string;
}

const stats: StatItem[] = [
  {
    label: "周活跃用户",
    value: 8500,
    suffix: "+",
    icon: <UserOutlined />,
    color: "#6366f1",
  },
  {
    label: "项目模板",
    value: 12,
    suffix: "",
    icon: <FileTextOutlined />,
    color: "#8b5cf6",
  },
  {
    label: "技术栈集成",
    value: 20,
    suffix: "+",
    icon: <ApiOutlined />,
    color: "#f093fb",
  },
];

function formatNumber(num: number) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";
  }
  return num.toString();
}

function AnimatedNumber({
  value,
  suffix,
  color,
}: {
  value: number;
  suffix: string;
  color: string;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1800;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(value * easeOut);

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return (
    <span
      style={{
        background: `linear-gradient(135deg, ${color} 0%, ${color}cc 100%)`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {formatNumber(displayValue)}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <Row gutter={[24, 32]} justify="center">
          {stats.map((stat, index) => (
            <Col key={index} xs={24} sm={8}>
              <div className={styles.item}>
                <div
                  className={styles.iconBox}
                  style={{
                    background: `linear-gradient(135deg, ${stat.color} 0%, color-mix(in srgb, ${stat.color} 80%, transparent) 100%)`,
                    boxShadow: `0 8px 24px color-mix(in srgb, ${stat.color} 30%, transparent)`,
                  }}
                >
                  {stat.icon}
                </div>

                <Title level={1} className={styles.value}>
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} color={stat.color} />
                </Title>

                <Text className={styles.label}>{stat.label}</Text>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}
