import { Card, Typography, Avatar, Tooltip, Row, Col, Divider, Button } from "antd";
import { GithubOutlined, LinkOutlined, RocketOutlined } from "@ant-design/icons";
import { useAboutData } from "~/hooks";

const { Title, Paragraph, Text } = Typography;

const TECH_STACK_ICONS: Record<string, { icon: string; color: string }> = {
  react: { icon: "⚛️", color: "#61DAFB" },
  "react-router": { icon: "🚀", color: "#FF6B6B" },
  vite: { icon: "⚡", color: "#646CFF" },
  antd: { icon: "🎨", color: "#1890FF" },
  hono: { icon: "🔥", color: "#E3602C" },
  drizzle: { icon: "🗄️", color: "#0EA5E9" },
  typescript: { icon: "📘", color: "#3178C6" },
  aiSdk: { icon: "🤖", color: "#10B981" },
};

function getTechIcon(depName: string) {
  const lower = depName.toLowerCase();
  for (const [key, value] of Object.entries(TECH_STACK_ICONS)) {
    if (lower.includes(key)) {
      return value;
    }
  }
  return { icon: "📦", color: "#8B8B8B" };
}

export function Route() {
  const data = useAboutData();

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px" }}>
      <Card
        variant="borderless"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: 16,
          overflow: "hidden",
          marginBottom: 32,
        }}
        bodyStyle={{ padding: 48 }}
      >
        <Row align="middle" gutter={[48, 24]}>
          <Col xs={24} md={14}>
            <Title level={1} style={{ color: "white", marginBottom: 16, fontSize: "2.5rem" }}>
              {data.projectName}
            </Title>
            <Paragraph style={{ color: "rgba(255,255,255,0.9)", fontSize: 16, lineHeight: 1.8 }}>
              {data.description}
            </Paragraph>
            <div style={{ display: "flex", gap: "12px" }}>
              <a
                href={data.repoUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.2)",
                  padding: "8px 16px",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "white",
                  backdropFilter: "blur(8px)",
                  textDecoration: "none",
                  transition: "background 0.2s",
                }}
              >
                <GithubOutlined />
                GitHub
              </a>
              <a
                href={data.homepage}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.2)",
                  padding: "8px 16px",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "white",
                  backdropFilter: "blur(8px)",
                  textDecoration: "none",
                  transition: "background 0.2s",
                }}
              >
                <RocketOutlined />
                预览
              </a>
            </div>
          </Col>
          <Col xs={24} md={10}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
              <div
                style={{
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.1)",
                  padding: "16px",
                  textAlign: "center",
                  backdropFilter: "blur(8px)",
                }}
              >
                <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>版本</Text>
                <Title level={3} style={{ color: "white", margin: "8px 0 0" }}>
                  {data.version}
                </Title>
              </div>
              <div
                style={{
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.1)",
                  padding: "16px",
                  textAlign: "center",
                  backdropFilter: "blur(8px)",
                }}
              >
                <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>最后编译</Text>
                <Title level={5} style={{ color: "white", margin: "8px 0 0", fontSize: 14 }}>
                  {data.lastBuildTime}
                </Title>
              </div>
            </div>
          </Col>
        </Row>
      </Card>

      <Card
        title={
          <Title level={3} style={{ margin: 0 }}>
            技术栈
          </Title>
        }
        style={{ borderRadius: 12, marginBottom: 32 }}
      >
        <Row gutter={[12, 12]}>
          {data.productionDeps
            .filter((dep) => {
              const name = dep.name.toLowerCase();
              return (
                name.includes("react") ||
                name.includes("router") ||
                name.includes("vite") ||
                name.includes("antd") ||
                name.includes("tailwind") ||
                name.includes("hono") ||
                name.includes("drizzle") ||
                name.includes("typescript") ||
                name.includes("ai-sdk")
              );
            })
            .slice(0, 9)
            .map((dep) => {
              const tech = getTechIcon(dep.name);
              return (
                <Col xs={12} sm={8} md={6} lg={4} key={dep.name}>
                  <Tooltip title={`${dep.name}@${dep.version}`}>
                    <Card
                      hoverable
                      size="small"
                      style={{
                        textAlign: "center",
                        borderRadius: 10,
                        border: `2px solid ${tech.color}30`,
                      }}
                      bodyStyle={{ padding: "16px 8px" }}
                    >
                      <Avatar
                        size={48}
                        style={{ backgroundColor: tech.color, marginBottom: 8, fontSize: 24 }}
                      >
                        {tech.icon}
                      </Avatar>
                      <Text strong style={{ fontSize: 13, display: "block" }}>
                        {dep.name}
                      </Text>
                      <Text type="secondary" style={{ fontSize: 11 }}>
                        {dep.version}
                      </Text>
                    </Card>
                  </Tooltip>
                </Col>
              );
            })}
        </Row>
      </Card>

      <Card
        title={
          <Title level={3} style={{ margin: 0 }}>
            依赖详情
          </Title>
        }
        style={{ borderRadius: 12 }}
      >
        <Row gutter={[12, 12]}>
          {data.productionDeps.map((dep) => {
            const tech = getTechIcon(dep.name);
            return (
              <Col xs={12} sm={8} md={6} lg={4} key={dep.name}>
                <Tooltip title={`${dep.version} - 点击查看 NPM`}>
                  <a
                    href={dep.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{ display: "block", textDecoration: "none" }}
                  >
                    <Card
                      hoverable
                      size="small"
                      style={{
                        borderRadius: 10,
                        border: "1px solid var(--ant-border-secondary)",
                      }}
                      bodyStyle={{ padding: "12px" }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <Avatar size={32} style={{ backgroundColor: tech.color, fontSize: 14 }}>
                          {tech.icon}
                        </Avatar>
                        <div style={{ minWidth: 0, flex: 1 }}>
                          <Text
                            ellipsis
                            style={{ fontSize: 12, display: "block", fontWeight: 500 }}
                          >
                            {dep.name}
                          </Text>
                          <Text type="secondary" style={{ fontSize: 10 }}>
                            {dep.version}
                          </Text>
                        </div>
                        <LinkOutlined
                          style={{
                            fontSize: 12,
                            flexShrink: 0,
                            color: "var(--ant-color-text-tertiary)",
                          }}
                        />
                      </div>
                    </Card>
                  </a>
                </Tooltip>
              </Col>
            );
          })}
        </Row>

        <Divider style={{ margin: "24px 0" }} />

        <Title level={5}>开发依赖</Title>
        <Row gutter={[12, 12]}>
          {data.developmentDeps.map((dep) => {
            const tech = getTechIcon(dep.name);
            return (
              <Col xs={12} sm={8} md={6} lg={4} key={dep.name}>
                <Tooltip title={`${dep.version} - 点击查看 NPM`}>
                  <a
                    href={dep.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{ display: "block", textDecoration: "none" }}
                  >
                    <Card
                      hoverable
                      size="small"
                      style={{
                        borderRadius: 10,
                        border: "1px solid var(--ant-border-secondary)",
                      }}
                      bodyStyle={{ padding: "12px" }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <Avatar size={32} style={{ backgroundColor: tech.color, fontSize: 14 }}>
                          {tech.icon}
                        </Avatar>
                        <div style={{ minWidth: 0, flex: 1 }}>
                          <Text
                            ellipsis
                            style={{ fontSize: 12, display: "block", fontWeight: 500 }}
                          >
                            {dep.name}
                          </Text>
                          <Text type="secondary" style={{ fontSize: 10 }}>
                            {dep.version}
                          </Text>
                        </div>
                        <LinkOutlined
                          style={{
                            fontSize: 12,
                            flexShrink: 0,
                            color: "var(--ant-color-text-tertiary)",
                          }}
                        />
                      </div>
                    </Card>
                  </a>
                </Tooltip>
              </Col>
            );
          })}
        </Row>
      </Card>
    </div>
  );
}
