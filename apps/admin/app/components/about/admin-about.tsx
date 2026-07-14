import { type AboutData, type AboutDependency } from "~/hooks/useAboutData";

import {
  LinkOutlined,
  RocketOutlined,
  GithubOutlined,
  GlobalOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { m } from "~/paraglide/messages";
import { Card, Col, Flex, Row, Tag, Tooltip, Typography } from "antd";
import { DEPENDENCY_KEYS, getMajorVersion } from "~/hooks/useAboutData";

const { Title } = Typography;

function AboutProjectCard({
  projectName,
  techStack,
}: {
  projectName: string;
  techStack: Record<string, string>;
}) {
  const stackText = DEPENDENCY_KEYS.map(
    (key) => `${key} ${getMajorVersion(techStack[key])}.x`,
  ).join("、");

  return (
    <Card
      title={
        <Title level={4} style={{ margin: 0 }}>
          {m.about_card_title()}
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
          {m.about_card_description({ techStack: stackText })}
        </Typography.Paragraph>
      </div>
    </Card>
  );
}

function AboutProjectInfo({
  version,
  lastBuildTime,
  repoUrl,
  repoLabel,
  homepage,
}: {
  version: string;
  lastBuildTime: string;
  repoUrl: string;
  repoLabel: string;
  homepage: string;
}) {
  const infoItems = [
    {
      label: m.about_info_version(),
      value: version,
      icon: <RocketOutlined />,
      color: "processing",
    },
    {
      label: m.about_info_last_build(),
      value: lastBuildTime,
      icon: <ClockCircleOutlined />,
      color: "processing",
    },
    {
      label: m.about_info_github(),
      value: repoLabel,
      icon: <GithubOutlined />,
      href: repoUrl,
      color: "cyan",
    },
    {
      label: m.about_info_preview(),
      value: m.about_info_preview_label(),
      icon: <GlobalOutlined />,
      href: homepage,
      color: "cyan",
    },
  ];

  return (
    <Card
      title={
        <Title level={4} style={{ margin: 0 }}>
          {m.about_info_title()}
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

function AboutDependencies({
  productionDeps,
  developmentDeps,
}: {
  productionDeps: AboutDependency[];
  developmentDeps: AboutDependency[];
}) {
  const allDeps = [...productionDeps, ...developmentDeps];

  return (
    <Card
      title={
        <Title level={4} style={{ margin: 0 }}>
          {m.about_dep_title()}
        </Title>
      }
      style={{ borderRadius: 8 }}
    >
      <Flex gap={16} style={{ marginBottom: 16 }} wrap="wrap">
        <Tag color="blue">{m.about_dep_production({ count: productionDeps.length })}</Tag>
        <Tag color="green">{m.about_dep_development({ count: developmentDeps.length })}</Tag>
      </Flex>
      <Row gutter={[12, 12]} style={{ maxHeight: 400, overflow: "auto", marginInline: 0 }}>
        {allDeps.map((dep) => {
          const hasVersion = dep.version && dep.version !== "catalog:";
          const tooltipText = hasVersion
            ? m.about_dep_tooltip({ version: dep.version })
            : m.about_dep_version_missing();
          return (
            <Col key={dep.name} xs={24} sm={12} lg={8}>
              <Tooltip title={tooltipText}>
                <Card
                  hoverable
                  size="small"
                  variant="outlined"
                  styles={{ body: { padding: 12 } }}
                  style={{ cursor: "pointer" }}
                  onClick={() => window.open(dep.url, "_blank", "noopener,noreferrer")}
                >
                  <Flex justify="space-between" align="center" gap={8}>
                    <div style={{ minWidth: 0 }}>
                      <Typography.Text strong ellipsis>
                        {dep.name}
                      </Typography.Text>
                      <Typography.Paragraph
                        type="secondary"
                        style={{ fontSize: 12, marginTop: 2, marginBottom: 0 }}
                        ellipsis
                      >
                        {hasVersion ? dep.version : m.about_dep_version_missing()}
                      </Typography.Paragraph>
                    </div>
                    <LinkOutlined
                      style={{ fontSize: 16, color: "var(--ant-color-text-tertiary)" }}
                    />
                  </Flex>
                </Card>
              </Tooltip>
            </Col>
          );
        })}
      </Row>
    </Card>
  );
}

export function AdminAbout(data: AboutData) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <AboutProjectCard projectName={data.projectName} techStack={data.techStack} />
      <AboutProjectInfo
        version={data.version}
        lastBuildTime={data.lastBuildTime}
        repoUrl={data.repoUrl}
        repoLabel={data.repoLabel}
        homepage={data.homepage}
      />
      <AboutDependencies
        productionDeps={data.productionDeps}
        developmentDeps={data.developmentDeps}
      />
    </div>
  );
}
