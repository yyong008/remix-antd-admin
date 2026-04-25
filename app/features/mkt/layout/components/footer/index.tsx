import { Layout, Row, Col, Typography, Space, Button, Divider } from "antd";
import { Link, useParams } from "react-router";
import {
  GithubOutlined,
  TwitterOutlined,
  DiscordOutlined,
  YoutubeOutlined,
  HeartOutlined,
  CopyrightOutlined,
} from "@ant-design/icons";

import { defaultLang } from "~/config/lang";
import { getLinks } from "~/config/links";
import { PRODUCT_NAME } from "~/config/product";

const { Footer } = Layout;
const { Title, Text, Paragraph } = Typography;

const linkStyle: React.CSSProperties = {
  color: "var(--mkt-footer-link)",
  fontSize: "13px",
  fontWeight: 400,
  textDecoration: "none",
  transition: "all 0.2s",
};

const linkHoverStyle: React.CSSProperties = { color: "var(--mkt-accent)" };

const externalIconStyle: React.CSSProperties = {
  fontSize: "10px",
  marginLeft: "4px",
  color: "var(--mkt-footer-muted)",
};

const sectionTitleStyle: React.CSSProperties = {
  color: "var(--mkt-footer-text)",
  marginBottom: "12px",
  fontSize: "14px",
  fontWeight: 600,
};

const copyrightTextStyle: React.CSSProperties = {
  color: "var(--mkt-footer-muted)",
  fontSize: "13px",
};

const footerNoteStyle: React.CSSProperties = {
  color: "var(--mkt-footer-muted)",
  fontSize: "12px",
};

const socialLinks = [
  {
    icon: <GithubOutlined />,
    label: "GitHub",
    url: "https://github.com/yyong008/remix-antd-admin",
  },
  { icon: <TwitterOutlined />, label: "Twitter", url: "https://twitter.com" },
  { icon: <DiscordOutlined />, label: "Discord", url: "https://discord.com" },
  { icon: <YoutubeOutlined />, label: "YouTube", url: "https://youtube.com" },
];

export function NavFooter() {
  const { locale } = useParams();
  const data = getLinks(locale ?? defaultLang);

  return (
    <Footer
      style={{
        background: "var(--mkt-footer-bg)",
        padding: "48px 24px 24px",
        color: "var(--mkt-footer-text)",
        borderTop: "1px solid var(--mkt-border)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Row gutter={[48, 32]}>
          <Col xs={24} lg={8}>
            <Space align="center" style={{ marginBottom: "16px" }}>
              <img
                src="/logo.png"
                alt="Logo"
                style={{ width: "40px", height: "40px", borderRadius: "8px", objectFit: "contain" }}
              />
              <Title level={4} style={{ color: "var(--mkt-footer-text)", margin: 0 }}>
                {PRODUCT_NAME}
              </Title>
            </Space>
            <Paragraph
              style={{
                color: "var(--mkt-footer-muted)",
                marginBottom: "20px",
                fontSize: "14px",
                lineHeight: 1.6,
              }}
            >
              全栈 AI 管理后台模板，集成现代 Web 工具链与最佳实践。
            </Paragraph>
            <Space size="small">
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  type="text"
                  icon={social.icon}
                  href={social.url}
                  target="_blank"
                  aria-label={social.label}
                  style={linkStyle}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = linkHoverStyle.color || "#000")
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.color = linkStyle.color || "#000")}
                />
              ))}
            </Space>
          </Col>

          <Col xs={24} lg={16}>
            <Row gutter={[64, 24]} justify="end">
              {data.map((section, index) => (
                <Col key={index}>
                  <div style={sectionTitleStyle}>{section.title}</div>
                  <Space orientation="vertical" size={8} style={{ width: "100%" }}>
                    {section.links.map((link, linkIndex) => (
                      <Link
                        key={linkIndex}
                        to={link.to}
                        target={link.isOut ? "_blank" : "_self"}
                        style={linkStyle}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = linkHoverStyle.color || "#000")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = linkStyle.color || "#000")
                        }
                      >
                        <Space size="small">
                          <span>{link.text}</span>
                          {link.isOut && <span style={externalIconStyle}>↗</span>}
                        </Space>
                      </Link>
                    ))}
                  </Space>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        <Divider style={{ borderColor: "var(--mkt-border)", margin: "28px 0 20px" }} />

        <Row justify="space-between" align="middle" gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Space wrap>
              <CopyrightOutlined style={{ color: copyrightTextStyle.color }} />
              <Text style={copyrightTextStyle}>
                {new Date().getFullYear()} {PRODUCT_NAME}. 保留所有权利。
              </Text>
            </Space>
          </Col>
        </Row>

        <Row justify="center" style={{ marginTop: "16px" }}>
          <Col>
            <Text style={footerNoteStyle}>Made with ❤️ by the {PRODUCT_NAME} team</Text>
          </Col>
        </Row>
      </div>
    </Footer>
  );
}
