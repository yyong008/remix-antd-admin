import { Layout, Row, Col, Typography, Space, Button, Divider, List, Avatar, Input } from "antd";
import { Link, useParams } from "react-router";
import {
  GithubOutlined,
  TwitterOutlined,
  DiscordOutlined,
  YoutubeOutlined,
  MailOutlined,
  HeartOutlined,
  RocketOutlined,
  BookOutlined,
  ApiOutlined,
  CodeOutlined,
  DatabaseOutlined,
  RobotOutlined,
  ThunderboltOutlined,
  CopyrightOutlined,
} from "@ant-design/icons";

import { defaultLang } from "~/config/lang";
import { getLinks } from "~/config/links";

const { Footer } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Search } = Input;

// 统一样式常量
const linkStyle = {
  color: "rgba(255, 255, 255, 0.7)",
  fontSize: "14px",
  fontWeight: "400",
  textDecoration: "none",
  transition: "all 0.3s",
};

const linkHoverStyle = {
  color: "rgba(255, 255, 255, 1)",
};

const externalIconStyle = {
  fontSize: "10px",
  marginLeft: "4px",
  color: "rgba(255, 255, 255, 0.7)",
};

const sectionTitleStyle = {
  color: "white",
  marginBottom: "20px",
  fontSize: "16px",
  fontWeight: "600",
};

const copyrightTextStyle = {
  color: "rgba(255, 255, 255, 0.5)",
  fontSize: "14px",
};

const copyrightLinkStyle = {
  ...linkStyle,
  color: "rgba(255, 255, 255, 0.5)",
};

const footerNoteStyle = {
  color: "rgba(255, 255, 255, 0.3)",
  fontSize: "12px",
};

// 社交媒体链接
const socialLinks = [
  { icon: <GithubOutlined />, label: "GitHub", url: "https://github.com/yyong008/remix-antd-admin" },
  { icon: <TwitterOutlined />, label: "Twitter", url: "https://twitter.com" },
  { icon: <DiscordOutlined />, label: "Discord", url: "https://discord.com" },
  { icon: <YoutubeOutlined />, label: "YouTube", url: "https://youtube.com" },
];

// 核心特性
const coreFeatures = [
  { icon: <RocketOutlined />, label: "React Router Express" },
  { icon: <ApiOutlined />, label: "Ant Design 组件" },
  { icon: <CodeOutlined />, label: "TailwindCSS" },
  { icon: <RobotOutlined />, label: "LangChain AI" },
  { icon: <DatabaseOutlined />, label: "Drizzle ORM" },
  { icon: <ThunderboltOutlined />, label: "高性能优化" },
];

export function NavFooter() {
  const { lang } = useParams();
  const data = getLinks(lang || defaultLang);

  return (
    <Footer style={{
      background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
      padding: "64px 24px 24px",
      color: "white",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* 顶部区域：Logo和描述 */}
        <Row gutter={[48, 48]} style={{ marginBottom: "48px" }}>
          <Col xs={24} md={8}>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <Space align="center">
                <Avatar
                  src="/logo.png"
                  size={64}
                  style={{ border: "2px solid rgba(255, 255, 255, 0.1)" }}
                />
                <Title level={3} style={{ color: "white", margin: 0 }}>
                  Remix Antd Admin
                </Title>
              </Space>

              <Paragraph style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                一个基于 Remix 的全栈 AI 管理后台模板，集成了现代 Web 开发的最佳实践和工具链。
              </Paragraph>

              {/* 社交媒体链接 */}
              <Space size="middle">
                {socialLinks.map((social, index) => (
                  <Button
                    key={index}
                    type="text"
                    icon={social.icon}
                    href={social.url}
                    target="_blank"
                    style={linkStyle}
                    onMouseEnter={(e) => e.currentTarget.style.color = linkHoverStyle.color}
                    onMouseLeave={(e) => e.currentTarget.style.color = linkStyle.color}
                  />
                ))}
              </Space>
            </Space>
          </Col>

          <Col xs={24} md={8}>
            <div style={sectionTitleStyle}>
              核心特性
            </div>
            <List
              dataSource={coreFeatures}
              renderItem={(item) => (
                <List.Item style={{ padding: "8px 0", border: "none" }}>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        size="small"
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          color: "white",
                        }}
                        icon={item.icon}
                      />
                    }
                    title={
                      <Text style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                        {item.label}
                      </Text>
                    }
                  />
                </List.Item>
              )}
            />
          </Col>

          <Col xs={24} md={8}>
            <div style={sectionTitleStyle}>
              订阅更新
            </div>
            <Paragraph style={{ color: "rgba(255, 255, 255, 0.7)", marginBottom: "16px" }}>
              订阅获取最新版本和功能更新
            </Paragraph>
            <Search
              placeholder="输入您的邮箱"
              enterButton={
                <Button type="primary" icon={<MailOutlined />}>
                  订阅
                </Button>
              }
              size="large"
              style={{ marginBottom: "16px" }}
            />
            <Text type="secondary" style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "12px" }}>
              我们尊重您的隐私，不会分享您的邮箱
            </Text>
          </Col>
        </Row>

        <Divider style={{ borderColor: "rgba(255, 255, 255, 0.1)", margin: "32px 0" }} />

        {/* 链接区域 */}
        <Row gutter={[32, 32]} style={{ marginBottom: "48px" }}>
          {data.map((section, index) => (
            <Col key={index} xs={12} md={6}>
              <div style={sectionTitleStyle}>
                {section.title}
              </div>
              <Space direction="vertical" size="small" style={{ width: "100%" }}>
                {section.links.map((link, linkIndex) => (
                  <Link
                    key={linkIndex}
                    to={link.to}
                    target={link.isOut ? "_blank" : "_self"}
                    style={linkStyle}
                    onMouseEnter={(e) => e.currentTarget.style.color = linkHoverStyle.color}
                    onMouseLeave={(e) => e.currentTarget.style.color = linkStyle.color}
                  >
                    <Space size="small">
                      <span style={{ fontSize: linkStyle.fontSize, fontWeight: linkStyle.fontWeight }}>
                        {link.text}
                      </span>
                      {link.isOut && <span style={externalIconStyle}>↗</span>}
                    </Space>
                  </Link>
                ))}
              </Space>
            </Col>
          ))}

          {/* 额外链接列 */}
          <Col xs={12} md={6}>
            <div style={sectionTitleStyle}>
              支持
            </div>
            <Space direction="vertical" size="small" style={{ width: "100%" }}>
              <Link
                to="/support"
                style={linkStyle}
                onMouseEnter={(e) => e.currentTarget.style.color = linkHoverStyle.color}
                onMouseLeave={(e) => e.currentTarget.style.color = linkStyle.color}
              >
                帮助中心
              </Link>
              <Link
                to="/contact"
                style={linkStyle}
                onMouseEnter={(e) => e.currentTarget.style.color = linkHoverStyle.color}
                onMouseLeave={(e) => e.currentTarget.style.color = linkStyle.color}
              >
                联系我们
              </Link>
              <Link
                to="/status"
                style={linkStyle}
                onMouseEnter={(e) => e.currentTarget.style.color = linkHoverStyle.color}
                onMouseLeave={(e) => e.currentTarget.style.color = linkStyle.color}
              >
                系统状态
              </Link>
              <Link
                to="/feedback"
                style={linkStyle}
                onMouseEnter={(e) => e.currentTarget.style.color = linkHoverStyle.color}
                onMouseLeave={(e) => e.currentTarget.style.color = linkStyle.color}
              >
                反馈建议
              </Link>
            </Space>
          </Col>
        </Row>

        <Divider style={{ borderColor: "rgba(255, 255, 255, 0.1)", margin: "32px 0" }} />

        {/* 底部区域：版权信息 */}
        <Row justify="space-between" align="middle">
          <Col>
            <Space>
              <CopyrightOutlined style={{ color: copyrightTextStyle.color }} />
              <Text style={copyrightTextStyle}>
                {new Date().getFullYear()} Remix Antd Admin. 保留所有权利。
              </Text>
            </Space>
          </Col>
          <Col>
            <Space size="large">
              <Link
                to="/privacy"
                style={copyrightLinkStyle}
                onMouseEnter={(e) => e.currentTarget.style.color = linkHoverStyle.color}
                onMouseLeave={(e) => e.currentTarget.style.color = copyrightLinkStyle.color}
              >
                隐私政策
              </Link>
              <Link
                to="/terms"
                style={copyrightLinkStyle}
                onMouseEnter={(e) => e.currentTarget.style.color = linkHoverStyle.color}
                onMouseLeave={(e) => e.currentTarget.style.color = copyrightLinkStyle.color}
              >
                服务条款
              </Link>
              <Link
                to="/cookies"
                style={copyrightLinkStyle}
                onMouseEnter={(e) => e.currentTarget.style.color = linkHoverStyle.color}
                onMouseLeave={(e) => e.currentTarget.style.color = copyrightLinkStyle.color}
              >
                Cookie政策
              </Link>
              <Button
                type="text"
                icon={<HeartOutlined />}
                href="https://github.com/yyong008/remix-antd-admin/stargazers"
                target="_blank"
                style={copyrightLinkStyle}
                onMouseEnter={(e) => e.currentTarget.style.color = linkHoverStyle.color}
                onMouseLeave={(e) => e.currentTarget.style.color = copyrightLinkStyle.color}
              >
                给我们星标
              </Button>
            </Space>
          </Col>
        </Row>

        {/* 备案信息 */}
        <Row justify="center" style={{ marginTop: "24px" }}>
          <Col>
            <Text style={footerNoteStyle}>
              Made with ❤️ by the Remix Antd Admin team
            </Text>
          </Col>
        </Row>
      </div>
    </Footer>
  );
}
