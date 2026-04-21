import { Card, Flex, Typography } from "antd";
import { RocketOutlined, GithubOutlined, GlobalOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

interface AboutHeroCardProps {
  projectName: string;
  description: string;
}

export function AboutHeroCard({ projectName, description }: AboutHeroCardProps) {
  return (
    <Card
      variant="borderless"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: 16,
        overflow: "hidden",
      }}
      styles={{ body: { padding: 48 } }}
    >
      <Title level={1} style={{ color: "white", marginBottom: 16, fontSize: "2.5rem" }}>
        {projectName}
      </Title>
      <Paragraph
        style={{
          color: "rgba(255, 255, 255, 0.9)",
          fontSize: 16,
          lineHeight: 1.8,
          marginBottom: 0,
        }}
      >
        {description}
      </Paragraph>
    </Card>
  );
}

interface ProjectInfoCardProps {
  version: string;
  lastBuildTime: string;
  repoUrl: string;
  repoLabel: string;
  homepage: string;
}

export function ProjectInfoCard({
  version,
  lastBuildTime,
  repoUrl,
  repoLabel,
  homepage,
}: ProjectInfoCardProps) {
  const infoItems = [
    { label: "版本", value: version, icon: <RocketOutlined /> },
    { label: "最后编译", value: lastBuildTime, icon: null },
    { label: "GitHub", value: repoLabel, icon: <GithubOutlined />, href: repoUrl },
    { label: "预览地址", value: "访问", icon: <GlobalOutlined />, href: homepage },
  ];

  return (
    <Card
      title={
        <Title level={4} style={{ margin: 0 }}>
          项目信息
        </Title>
      }
      style={{ borderRadius: 12 }}
      styles={{ body: { padding: 0 } }}
    >
      <Flex vertical gap={12} style={{ padding: 0 }}>
        {infoItems.map((item, index) => (
          <Flex
            key={index}
            align="center"
            justify="space-between"
            style={{
              padding: 16,
              borderRadius: 8,
              border: "1px solid var(--ant-border-secondary)",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--ant-color-bg-secondary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "";
            }}
          >
            <Flex align="center" gap={12}>
              {item.icon && (
                <span style={{ fontSize: 18, color: "var(--ant-color-primary)" }}>{item.icon}</span>
              )}
              <Typography.Text type="secondary" style={{ fontSize: 14 }}>
                {item.label}
              </Typography.Text>
            </Flex>
            {item.href ? (
              <Typography.Link
                href={item.href}
                target="_blank"
                rel="noreferrer"
                style={{ fontWeight: 500 }}
              >
                {item.value}
              </Typography.Link>
            ) : (
              <Typography.Text strong>{item.value}</Typography.Text>
            )}
          </Flex>
        ))}
      </Flex>
    </Card>
  );
}
