import {
  Layout,
  Row,
  Col,
  Card,
  Typography,
  Button,
  Space,
  Tag,
  Avatar,
  List,
  Divider,
  Tooltip,
} from "antd";
import {
  GithubOutlined,
  BookOutlined,
  RocketOutlined,
  ApiOutlined,
  DatabaseOutlined,
  RobotOutlined,
  CodeOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { TypeAnimation } from "react-type-animation";

const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;

// 技术栈数据
const techStack = [
  {
    name: "React Router",
    icon: "🚀",
    color: "#FF6B6B",
    description: "路由框架",
  },
  { name: "Hono", icon: "⚡", color: "#4ECDC4", description: "后端框架" },
  { name: "React", icon: "⚛️", color: "#61DAFB", description: "前端框架" },
  {
    name: "Ant Design",
    icon: "🎨",
    color: "#1890FF",
    description: "UI 组件库",
  },
  {
    name: "Tailwind CSS",
    icon: "🎯",
    color: "#06B6D4",
    description: "CSS 框架",
  },
  { name: "Drizzle", icon: "🗄️", color: "#0EA5E9", description: "ORM 工具" },
  { name: "LangChain", icon: "🤖", color: "#10B981", description: "AI 框架" },
];

// 特性数据
const features = [
  {
    icon: <RocketOutlined />,
    title: "React Router Hono 内置支持",
    description: "基于 Remix + Hono 路由快速开发项目",
    color: "#FF6B6B",
  },
  {
    icon: <ApiOutlined />,
    title: "Ant Design 组件支持",
    description: "基于 Ant Design 组件库开发项目",
    color: "#1890FF",
  },
  {
    icon: <CodeOutlined />,
    title: "TailwindCSS 组件支持",
    description: "基于 TailwindCSS 组件库开发项目",
    color: "#06B6D4",
  },
  {
    icon: <RobotOutlined />,
    title: "LangChain 内置支持",
    description: "基于 LangChain 的 AI 能力开发项目",
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
];

export function Route() {
  return (
    <Content style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* 顶部标签 */}
      <Row justify="center" style={{ marginBottom: "32px" }}>
        <Col>
          <Tag
            icon="🎉"
            color="gold"
            style={{
              padding: "8px 16px",
              fontSize: "16px",
              borderRadius: "20px",
            }}
          >
            <Space>
              <Text strong>{new Date().getFullYear()}</Text>
              <Text>👋 Happy New Year</Text>
            </Space>
          </Tag>
        </Col>
      </Row>

      {/* Hero 区域 */}
      <Card
        bordered={false}
        style={{
          marginBottom: "48px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "16px",
          overflow: "hidden",
        }}
        bodyStyle={{ padding: "48px" }}
      >
        <Row justify="center" align="middle">
          <Col xs={24} md={16} style={{ textAlign: "center" }}>
            <Title
              level={1}
              style={{
                color: "white",
                marginBottom: "24px",
                fontSize: "3.5rem",
              }}
            >
              <TypeAnimation
                sequence={["Remix", 1000, "Remix Antd ", 1000, "Remix Antd Admin", 1000]}
                wrapper="span"
                speed={50}
                style={{ display: "inline-block" }}
                repeat={Infinity}
              />
            </Title>

            <Paragraph
              style={{
                color: "rgba(255, 255, 255, 0.9)",
                fontSize: "20px",
                marginBottom: "32px",
                lineHeight: 1.6,
              }}
            >
              Remix Antd Admin 是一个全栈解决方案，帮助你快速启动基于 Remix 的 AI 项目。 集成了现代
              Web 开发的最佳实践和工具链。
            </Paragraph>

            <Space size="large">
              <Button
                type="primary"
                size="large"
                icon={<GithubOutlined />}
                href="https://github.com/yyong008/remix-antd-admin"
                target="_blank"
                style={{
                  height: "48px",
                  padding: "0 32px",
                  fontSize: "16px",
                  borderRadius: "8px",
                }}
              >
                GitHub
              </Button>
              <Button
                size="large"
                icon={<BookOutlined />}
                href="https://remix-antd-admin-docs.vercel.app/"
                target="_blank"
                style={{
                  height: "48px",
                  padding: "0 32px",
                  fontSize: "16px",
                  borderRadius: "8px",
                  background: "rgba(255, 255, 255, 0.1)",
                  borderColor: "rgba(255, 255, 255, 0.3)",
                  color: "white",
                }}
              >
                查看文档
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* 技术栈区域 */}
      <Card
        title={
          <Title level={2} style={{ margin: 0 }}>
            技术栈
          </Title>
        }
        style={{ marginBottom: "48px", borderRadius: "12px" }}
      >
        <Paragraph type="secondary" style={{ marginBottom: "24px" }}>
          基于现代 Web 开发技术栈构建，提供完整的开发体验
        </Paragraph>

        <Row gutter={[16, 16]} justify="center">
          {techStack.map((tech, index) => (
            <Col key={index} xs={12} sm={8} md={6} lg={4}>
              <Tooltip title={`${tech.name}: ${tech.description}`}>
                <Card
                  hoverable
                  style={{
                    textAlign: "center",
                    borderRadius: "12px",
                    border: `2px solid ${tech.color}20`,
                  }}
                  bodyStyle={{ padding: "16px 8px" }}
                >
                  <Avatar
                    size={48}
                    style={{
                      backgroundColor: tech.color,
                      marginBottom: "12px",
                      fontSize: "24px",
                    }}
                  >
                    {tech.icon}
                  </Avatar>
                  <Title level={5} style={{ margin: 0 }}>
                    {tech.name}
                  </Title>
                </Card>
              </Tooltip>
            </Col>
          ))}
        </Row>
      </Card>

      {/* 特性区域 */}
      <Card
        title={
          <Title level={2} style={{ margin: 0 }}>
            核心特性
          </Title>
        }
        style={{ marginBottom: "48px", borderRadius: "12px" }}
      >
        <Row gutter={[32, 32]}>
          <Col xs={24} md={12}>
            <div style={{ borderRadius: "12px", overflow: "hidden" }}>
              <img
                src="/images/feature/whatis.png"
                alt="Remix Antd Admin 特性"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
              />
            </div>
          </Col>
          <Col xs={24} md={12}>
            <Title level={3} style={{ marginBottom: "24px" }}>
              什么是 Remix Antd Admin?
            </Title>
            <Paragraph type="secondary" style={{ marginBottom: "32px" }}>
              Remix Antd Admin 能帮你迅速开始一个 Remix 全栈 AI 项目，
              提供完整的开发工具链和最佳实践。
            </Paragraph>

            <List
              itemLayout="horizontal"
              dataSource={features}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        size="large"
                        style={{
                          backgroundColor: item.color,
                          color: "white",
                        }}
                        icon={item.icon}
                      />
                    }
                    title={<Text strong>{item.title}</Text>}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </Card>

      {/* 行动号召 */}
      <Card
        style={{
          textAlign: "center",
          background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
          borderRadius: "16px",
          border: "none",
        }}
        bodyStyle={{ padding: "48px 24px" }}
      >
        <Title level={2} style={{ color: "white", marginBottom: "16px" }}>
          立即开始你的项目
        </Title>
        <Paragraph style={{ color: "rgba(255, 255, 255, 0.9)", marginBottom: "32px" }}>
          使用 Remix Antd Admin，快速构建现代化的全栈应用
        </Paragraph>
        <Space size="large">
          <Button
            type="primary"
            size="large"
            icon={<RocketOutlined />}
            href="https://github.com/yyong008/remix-antd-admin"
            target="_blank"
            style={{
              height: "48px",
              padding: "0 32px",
              fontSize: "16px",
              borderRadius: "8px",
              background: "white",
              borderColor: "white",
              color: "#f5576c",
            }}
          >
            开始使用
          </Button>
          <Button
            size="large"
            icon={<BookOutlined />}
            href="https://remix-antd-admin-docs.vercel.app/"
            target="_blank"
            style={{
              height: "48px",
              padding: "0 32px",
              fontSize: "16px",
              borderRadius: "8px",
              background: "rgba(255, 255, 255, 0.1)",
              borderColor: "rgba(255, 255, 255, 0.3)",
              color: "white",
            }}
          >
            查看示例
          </Button>
        </Space>
      </Card>
    </Content>
  );
}
