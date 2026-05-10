import { Card, Col, Flex, Row, Tag, Tooltip, Typography } from "antd";
import {
  RocketOutlined,
  GithubOutlined,
  GlobalOutlined,
  ClockCircleOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import type { AboutDependency } from "~/hooks/useAboutData";

const { Title } = Typography;

interface AdminAboutCardProps {
  projectName: string;
  description: string;
}

export function AdminAboutCard({ projectName, description }: AdminAboutCardProps) {
  return (
    <Card
      title={
        <Title level={4} style={{ margin: 0 }}>
          关于项目
        </Title>
      }
      style={{ borderRadius: 8 }}
    >
      <div style={{ marginBottom: 16 }}>
        <Tag color="purple" style={{ marginBottom: 8, fontSize: 14 }}>
          {projectName}
        </Tag>
        <Typography.Paragraph
          type="secondary"
          style={{ whiteSpace: "pre-line", fontSize: 14, lineHeight: 1.625, marginBottom: 0 }}
        >
          {description}
        </Typography.Paragraph>
      </div>
    </Card>
  );
}

interface AdminProjectInfoCardProps {
  version: string;
  lastBuildTime: string;
  repoUrl: string;
  repoLabel: string;
  homepage: string;
}

export function AdminProjectInfoCard({
  version,
  lastBuildTime,
  repoUrl,
  repoLabel,
  homepage,
}: AdminProjectInfoCardProps) {
  const infoItems = [
    { label: "版本", value: version, icon: <RocketOutlined />, color: "processing" },
    { label: "最后编译", value: lastBuildTime, icon: <ClockCircleOutlined />, color: "processing" },
    { label: "GitHub", value: repoLabel, icon: <GithubOutlined />, href: repoUrl, color: "cyan" },
    { label: "预览地址", value: "访问", icon: <GlobalOutlined />, href: homepage, color: "cyan" },
  ];

  return (
    <Card
      title={
        <Title level={4} style={{ margin: 0 }}>
          项目信息
        </Title>
      }
      style={{ borderRadius: 8 }}
    >
      <Row gutter={[16, 16]}>
        {infoItems.map((item, index) => (
          <Col key={index} xs={24} sm={12}>
            <Flex align="center" gap={12}>
              <Typography.Text type="secondary" style={{ fontSize: 14 }}>
                {item.label}
              </Typography.Text>
              {item.href ? (
                <Typography.Link
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontWeight: 500 }}
                >
                  <Flex align="center" gap={4}>
                    <LinkOutlined style={{ fontSize: 12 }} />
                    {item.value}
                  </Flex>
                </Typography.Link>
              ) : (
                <Tag color={item.color}>{item.value}</Tag>
              )}
            </Flex>
          </Col>
        ))}
      </Row>
    </Card>
  );
}

interface AdminDependencyCardProps {
  productionDeps: AboutDependency[];
  developmentDeps: AboutDependency[];
}

export function AdminDependencyCard({ productionDeps, developmentDeps }: AdminDependencyCardProps) {
  const allDeps = [...productionDeps, ...developmentDeps];

  return (
    <Card
      title={
        <Title level={4} style={{ margin: 0 }}>
          依赖信息
        </Title>
      }
      style={{ borderRadius: 8 }}
    >
      <Flex gap={16} style={{ marginBottom: 16 }} wrap="wrap">
        <Tag color="green">开发依赖 {developmentDeps.length}</Tag>
        <Tag color="blue">生产依赖 {productionDeps.length}</Tag>
      </Flex>
      <Row gutter={[12, 12]} style={{ maxHeight: 400, overflow: "auto", marginInline: 0 }}>
        {allDeps.map((dep) => (
          <Col key={dep.name} xs={24} sm={12} lg={8}>
            <Tooltip title={`${dep.version} - 点击查看 NPM`}>
              <Card
                hoverable
                size="small"
                variant="outlined"
                styles={{ body: { padding: 12 } }}
                style={{ cursor: "pointer" }}
                onClick={() => window.open(dep.url, "_blank", "noopener,noreferrer")}
              >
                <Flex justify="space-between" align="center" gap={8}>
                  <div>
                    <Typography.Text strong>{dep.name}</Typography.Text>
                    <Typography.Paragraph
                      type="secondary"
                      style={{ fontSize: 12, marginTop: 2, marginBottom: 0 }}
                    >
                      {dep.version}
                    </Typography.Paragraph>
                  </div>
                  <LinkOutlined style={{ fontSize: 16, color: "var(--ant-color-text-tertiary)" }} />
                </Flex>
              </Card>
            </Tooltip>
          </Col>
        ))}
      </Row>
    </Card>
  );
}
