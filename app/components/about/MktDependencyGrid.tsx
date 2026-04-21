import { useState, type CSSProperties } from "react";
import { Button, Card, Col, Flex, Row, Tag, Tooltip, Typography } from "antd";
import { LinkOutlined } from "@ant-design/icons";
import type { AboutDependency } from "~/hooks/useAboutData";

const { Title } = Typography;

interface DependencyGridProps {
  productionDeps: AboutDependency[];
  developmentDeps: AboutDependency[];
}

function DepTag({ dep }: { dep: AboutDependency }) {
  return (
    <Tooltip title={`${dep.name}@${dep.version} - 点击查看 NPM`}>
      <Card
        hoverable
        size="small"
        variant="outlined"
        styles={{ body: { paddingInline: 16, paddingBlock: 12 } }}
        style={{ cursor: "pointer", height: "100%" }}
        onClick={() => window.open(dep.url, "_blank", "noopener,noreferrer")}
      >
        <Flex justify="space-between" align="center" gap={8}>
          <Flex vertical gap={4}>
            <Typography.Text strong>{dep.name}</Typography.Text>
            <Tag color="blue" style={{ width: "fit-content", fontSize: 12, margin: 0 }}>
              {dep.version}
            </Tag>
          </Flex>
          <LinkOutlined
            style={{ fontSize: 16, color: "var(--ant-color-text-tertiary)", flexShrink: 0 }}
          />
        </Flex>
      </Card>
    </Tooltip>
  );
}

export function MktDependencyGrid({ productionDeps, developmentDeps }: DependencyGridProps) {
  const [activeTab, setActiveTab] = useState<"development" | "production">("development");

  const deps = activeTab === "production" ? productionDeps : developmentDeps;

  const tabBtnStyle: CSSProperties = {
    borderRadius: 6,
    paddingInline: 16,
    paddingBlock: 6,
    fontSize: 14,
    fontWeight: 500,
    height: "auto",
  };

  return (
    <Card style={{ borderRadius: 12 }} styles={{ body: { padding: 0 } }}>
      <Flex
        wrap="wrap"
        justify="space-between"
        align="center"
        gap={16}
        style={{ padding: "24px 24px 0" }}
      >
        <Title level={4} style={{ margin: 0 }}>
          {activeTab === "development" ? "开发依赖" : "生产依赖"}
        </Title>
        <Flex gap={8} wrap="wrap">
          <Button
            type={activeTab === "development" ? "primary" : "default"}
            onClick={() => setActiveTab("development")}
            style={tabBtnStyle}
          >
            开发依赖 ({developmentDeps.length})
          </Button>
          <Button
            type={activeTab === "production" ? "primary" : "default"}
            onClick={() => setActiveTab("production")}
            style={tabBtnStyle}
          >
            生产依赖 ({productionDeps.length})
          </Button>
        </Flex>
      </Flex>
      <Row gutter={[12, 12]} style={{ maxHeight: 400, overflow: "auto", padding: 24, margin: 0 }}>
        {deps.map((dep) => (
          <Col key={dep.name} xs={24} sm={12} lg={8}>
            <DepTag dep={dep} />
          </Col>
        ))}
      </Row>
    </Card>
  );
}
