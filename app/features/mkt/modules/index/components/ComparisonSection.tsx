import { Card, Typography, Table } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import styles from "./ComparisonSection.module.css";

const { Title, Paragraph } = Typography;

const features = [
  { feature: "React Router v7 支持", has: true },
  { feature: "Ant Design 组件库", has: true },
  { feature: "Hono API 集成", has: true },
  { feature: "AI SDK 支持", has: true },
  { feature: "Drizzle ORM", has: true },
  { feature: "开箱即用的 AI 功能", has: true },
  { feature: "原生 CSS 暗色模式", has: true },
  { feature: "Cloudflare 部署优化", has: true },
  { feature: "中文文档", has: true },
];

export function ComparisonSection() {
  const columns = [
    {
      title: "功能特性",
      dataIndex: "feature",
      key: "feature",
      width: "80%",
      render: (text: string) => <span className={styles.featureCell}>{text}</span>,
    },
    {
      title: "支持",
      dataIndex: "has",
      key: "has",
      width: "20%",
      align: "center" as const,
      render: (has: boolean) => (has ? <CheckOutlined className={styles.checkIcon} /> : null),
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Title level={2} className={styles.title}>
            技术特性
          </Title>
          <Paragraph className={styles.desc}>
            React Router Antd Admin 内置的功能特性，开箱即用
          </Paragraph>
        </div>

        <Card className={styles.card} styles={{ body: { padding: 0 } }}>
          <Table
            dataSource={features}
            columns={columns}
            rowKey="feature"
            pagination={false}
            size="small"
            className={styles.table}
            rowClassName={(_, index) =>
              index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd
            }
          />
        </Card>

        <div className={styles.footer}>
          <Title level={4} className={styles.footerTitle}>
            一站式全栈开发
          </Title>
          <Paragraph className={styles.footerDesc}>
            从前端到后端，从 AI 到数据库 — 一个模板搞定所有
          </Paragraph>
        </div>
      </div>
    </section>
  );
}
