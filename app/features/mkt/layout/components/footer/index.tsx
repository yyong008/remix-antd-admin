import { Layout, Row, Col, Typography, Space, Button, Divider } from "antd";
import { Link, useParams } from "react-router";
import {
  GithubOutlined,
  TwitterOutlined,
  DiscordOutlined,
  YoutubeOutlined,
  CopyrightOutlined,
} from "@ant-design/icons";

import { defaultLang } from "~/config/lang";
import { getLinks } from "~/config/links";
import { PRODUCT_NAME } from "~/config/product";
import styles from "./footer.module.css";

const { Footer } = Layout;
const { Title, Text, Paragraph } = Typography;

export function NavFooter() {
  const { locale } = useParams();
  const data = getLinks(locale ?? defaultLang);

  return (
    <Footer className={styles.footer}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Row gutter={[48, 32]}>
          <Col xs={24} lg={8}>
            <Space align="center" style={{ marginBottom: "16px" }}>
              <img
                src="/logo.png"
                alt="Logo"
                style={{ width: "40px", height: "40px", borderRadius: "8px", objectFit: "contain" }}
              />
              <Title level={4} style={{ color: "var(--ant-color-text)", margin: 0 }}>
                {PRODUCT_NAME}
              </Title>
            </Space>
            <Paragraph
              style={{
                color: "var(--ant-color-text-secondary)",
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
                  className={styles.socialLink}
                />
              ))}
            </Space>
          </Col>

          <Col xs={24} lg={16}>
            <Row gutter={[64, 24]} justify="end">
              {data.map((section, index) => (
                <Col key={index}>
                  <div className={styles.sectionTitle}>{section.title}</div>
                  <Space orientation="vertical" size={8} style={{ width: "100%" }}>
                    {section.links.map((link, linkIndex) => (
                      <Link
                        key={linkIndex}
                        to={link.to}
                        target={link.isOut ? "_blank" : "_self"}
                        className={styles.link}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "var(--ant-color-primary)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "var(--ant-color-text-secondary)")
                        }
                      >
                        <Space size="small">
                          <span>{link.text}</span>
                          {link.isOut && <span className={styles.externalIcon}>↗</span>}
                        </Space>
                      </Link>
                    ))}
                  </Space>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        <Divider style={{ margin: "28px 0 20px" }} />

        <Row justify="space-between" align="middle" gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Space wrap>
              <CopyrightOutlined style={{ color: "var(--ant-color-text-secondary)" }} />
              <Text style={{ color: "var(--ant-color-text-secondary)", fontSize: "13px" }}>
                {new Date().getFullYear()} {PRODUCT_NAME}. 保留所有权利。
              </Text>
            </Space>
          </Col>
        </Row>

        <Row justify="center" style={{ marginTop: "16px" }}>
          <Col>
            <Text style={{ color: "var(--ant-color-text-secondary)", fontSize: "12px" }}>
              Made with ❤️ by the {PRODUCT_NAME} team
            </Text>
          </Col>
        </Row>
      </div>
    </Footer>
  );
}

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
