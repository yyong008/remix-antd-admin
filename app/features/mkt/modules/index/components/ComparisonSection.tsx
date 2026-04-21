import { Card, Typography, Table } from "antd";
import { CheckOutlined } from "@ant-design/icons";

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
    },
    {
      title: "支持",
      dataIndex: "has",
      key: "has",
      width: "20%",
      align: "center" as const,
      render: (has: boolean) =>
        has ? <CheckOutlined style={{ color: "#52c41a", fontSize: "16px" }} /> : null,
    },
  ];

  return (
    <section style={{ padding: "60px 24px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <Title level={2} style={{ marginBottom: "8px" }}>
            技术特性
          </Title>
          <Paragraph type="secondary" style={{ maxWidth: "600px", margin: "0 auto" }}>
            React Router Antd Admin 内置的功能特性，开箱即用
          </Paragraph>
        </div>

        <Card
          style={{
            borderRadius: "12px",
            border: "1px solid var(--mkt-border)",
          }}
          bodyStyle={{ padding: 0 }}
        >
          <Table
            dataSource={features}
            columns={columns}
            rowKey="feature"
            pagination={false}
            size="small"
            style={{ width: "100%" }}
            rowClassName={(_, index) => (index % 2 === 0 ? "table-row-even" : "table-row-odd")}
          />
        </Card>

        {/* 底部总结 */}
        <div
          style={{
            textAlign: "center",
            marginTop: "32px",
            padding: "20px",
            background: "var(--mkt-surface)",
            borderRadius: "12px",
            border: "1px solid var(--mkt-border)",
          }}
        >
          <Title level={4} style={{ marginBottom: "8px" }}>
            一站式全栈开发
          </Title>
          <Paragraph type="secondary" style={{ margin: 0 }}>
            从前端到后端，从 AI 到数据库 — 一个模板搞定所有
          </Paragraph>
        </div>
      </div>

      <style>{`
        .table-row-even td {
          background: var(--mkt-bg) !important;
        }
        .table-row-odd td {
          background: var(--mkt-surface) !important;
        }
        .ant-table-thead > tr > th {
          padding: 12px 16px !important;
        }
        .ant-table-tbody > tr > td {
          border-bottom: 1px solid var(--mkt-border) !important;
          padding: 10px 16px !important;
          color: var(--mkt-text) !important;
        }
        .ant-table {
          background: transparent !important;
        }
        .ant-table-tbody > tr:last-child > td {
          border-bottom: none !important;
        }
      `}</style>
    </section>
  );
}
