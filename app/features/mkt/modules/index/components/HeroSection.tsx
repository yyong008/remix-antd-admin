import { Row, Col, Button, Typography } from "antd";
import { RocketOutlined, EyeOutlined, GithubOutlined } from "@ant-design/icons";
import { PRODUCT_NAME, PRODUCT_TAGLINE } from "~/config/product";
import styles from "./HeroSection.module.css";

const { Title, Paragraph } = Typography;

export function HeroSection() {
  return (
    <section className={styles.section}>
      {/* 背景装饰 */}
      <div className={styles.bgOrange} />
      <div className={styles.bgBlue} />

      <Row gutter={[48, 48]} align="middle">
        <Col xs={24} lg={12}>
          <div className={styles.content}>
            <div className={styles.badge}>
              <span className={styles.badgeIcon}>⚡</span>
              <span className={styles.badgeText}>基于 React Router v7 构建</span>
            </div>

            <Title level={1} className={styles.title}>
              {PRODUCT_NAME}
              <br />
              <span className={styles.gradientText}>全栈开发范式</span>
            </Title>

            <Paragraph className={styles.subtitle}>
              {PRODUCT_TAGLINE ||
                `${PRODUCT_NAME} 是一个全栈解决方案，帮助你快速启动基于 React Router 的 AI 项目。集成了现代 Web 开发的最佳实践和工具链。`}
            </Paragraph>

            <div className={styles.ctaContainer}>
              <Button
                type="primary"
                size="large"
                icon={<RocketOutlined />}
                href="https://github.com/yyong008/remix-antd-admin"
                target="_blank"
                rel="noopener noreferrer"
              >
                开始使用
              </Button>
              <Button
                size="large"
                icon={<EyeOutlined />}
                href="https://remix-antd-admin-docs.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                查看演示
              </Button>
              <Button
                size="large"
                icon={<GithubOutlined />}
                href="https://github.com/yyong008/remix-antd-admin"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </Button>
            </div>

            <div className={styles.trust}>
              <div className={styles.trustItem}>
                <span className={styles.trustValue}>50+</span>
                <span className={styles.trustLabel}>contributors</span>
              </div>
              <div className={styles.trustItem}>
                <span className={styles.trustValue}>v7</span>
                <span className={styles.trustLabel}>React Router</span>
              </div>
            </div>
          </div>
        </Col>

        <Col xs={24} lg={12}>
          <div className={styles.imageContainer}>
            <div className={styles.browserTop}>
              <div className={styles.dot} style={{ background: "#ff5f57" }} />
              <div className={styles.dot} style={{ background: "#ffbd2e" }} />
              <div className={styles.dot} style={{ background: "#28ca42" }} />
              <div className={styles.addressBar}>admin.remix-antd-admin.com</div>
            </div>
            <img src="/images/admin.png" alt={`${PRODUCT_NAME} Demo`} className={styles.image} />
          </div>

          <div className={styles.techTag}>
            <span className={styles.techTagIcon}>🎨</span>
            <span className={styles.techTagText}>Ant Design 6</span>
          </div>
        </Col>
      </Row>
    </section>
  );
}
